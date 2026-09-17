import { Workflow, WorkflowValidationError } from './workflowTypes';

export function validateWorkflow(workflow: Workflow): WorkflowValidationError[] {
  const errors: WorkflowValidationError[] = [];
  const { nodes, edges } = workflow;

  if (nodes.length === 0) {
    return errors;
  }

  // Count incoming and outgoing edges for each node
  const inDegree: Record<string, number> = {};
  const outDegree: Record<string, number> = {};

  nodes.forEach(node => {
    inDegree[node.id] = 0;
    outDegree[node.id] = 0;
  });

  edges.forEach(edge => {
    if (outDegree[edge.sourceId] !== undefined) {
      outDegree[edge.sourceId]++;
    }
    if (inDegree[edge.targetId] !== undefined) {
      inDegree[edge.targetId]++;
    }
  });

  nodes.forEach(node => {
    const totalConnections = inDegree[node.id] + outDegree[node.id];

    // 1. Completely disconnected / orphan box
    if (totalConnections === 0) {
      errors.push({
        id: `orphan-${node.id}`,
        type: 'orphan_node',
        nodeId: node.id,
        severity: 'warning',
        message: `Bağlantısız Kutu: "${node.title}" şemada herhangi bir girdi veya çıktı bağlantısına sahip değil.`
      });
    }

    // 2. Critical component not connected to any analysis
    if (node.type === 'critical_component' && outDegree[node.id] === 0) {
      errors.push({
        id: `unconnected-comp-${node.id}`,
        type: 'unconnected_component',
        nodeId: node.id,
        severity: 'warning',
        message: `Kritik Bileşen Bağlantısız: "${node.title}" herhangi bir analiz yöntemine bağlanmamış.`
      });
    }

    // 3. Hazard dataset not connected to any analysis
    if (node.type === 'hazard' && outDegree[node.id] === 0) {
      errors.push({
        id: `unassigned-dataset-${node.id}`,
        type: 'unassigned_dataset',
        nodeId: node.id,
        severity: 'warning',
        message: `Tehlike Verisi Kullanılmıyor: "${node.title}" henüz bir analiz yöntemine aktarılmamış.`
      });
    }

    // 4. Analysis method has no incoming datasets
    if (node.type === 'analysis_method' && inDegree[node.id] === 0) {
      errors.push({
        id: `no-input-${node.id}`,
        type: 'no_input',
        nodeId: node.id,
        severity: 'error',
        message: `Analiz Girdisi Eksik: "${node.title}" analiz yöntemine hiçbir veri seti veya kritik bileşen bağlanmamış.`
      });
    }

    // 5. Analysis method has no output defined or connected
    if (node.type === 'analysis_method' && outDegree[node.id] === 0 && !node.outputName) {
      errors.push({
        id: `missing-output-${node.id}`,
        type: 'missing_output',
        nodeId: node.id,
        severity: 'error',
        message: `Çıktı Tanımlanmamış: "${node.title}" yönteminin üreteceği ara çıktı veya hedef bağlantı tanımlanmamış.`
      });
    }

    // 6. Missing method selection or fields info in analysis method
    if (node.type === 'analysis_method' && !node.analysisMethod) {
      errors.push({
        id: `missing-fields-${node.id}`,
        type: 'missing_fields',
        nodeId: node.id,
        severity: 'info',
        message: `Yöntem Tipi Eksik: "${node.title}" analizinde kullanılacak CBS analiz yöntemi seçilmemiş.`
      });
    }

    // 7. Intermediate output not connected to integrated assessment or subsequent analysis
    if (node.type === 'intermediate_output' && outDegree[node.id] === 0) {
      errors.push({
        id: `unused-output-${node.id}`,
        type: 'unused_output',
        nodeId: node.id,
        severity: 'info',
        message: `Nihai Senteze Aktarılmamış: Ara çıktı "${node.title}" 8. Bölüm Bütünleşik Değerlendirme aşamasına bağlanmamış.`
      });
    }
  });

  return errors;
}
