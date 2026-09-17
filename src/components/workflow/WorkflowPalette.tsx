import React, { useState, useMemo, useEffect } from 'react';
import { PaletteItem, extractPaletteData } from '../../workflowDataExtractor';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  FileCheck, 
  Plus, 
  Pencil,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { NODE_TYPE_META, WorkflowNodeType } from '../../workflowTypes';
import { PaletteItemModal } from './PaletteItemModal';

const CUSTOM_PALETTE_KEY = 'ibb_workflow_custom_palette_items_v2';
const EDITED_PALETTE_KEY = 'ibb_workflow_edited_palette_items_v2';
const DELETED_PALETTE_KEY = 'ibb_workflow_deleted_palette_items_v2';

interface WorkflowPaletteProps {
  isOpen: boolean;
  onToggle: () => void;
  onAddItem: (item: PaletteItem) => void;
  activeGroup?: string;
  onSelectGroup?: (group: string) => void;
}

export const WorkflowPalette: React.FC<WorkflowPaletteProps> = ({
  isOpen,
  onToggle,
  onAddItem,
  activeGroup = 'all',
  onSelectGroup
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<'all' | '4' | '5' | '6' | '8'>('all');
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'ulasim' | 'teknikaltyapi' | 'lojistik'>(() => {
    if (activeGroup === 'ulasim' || activeGroup === 'teknikaltyapi' || activeGroup === 'lojistik') {
      return activeGroup;
    }
    return 'all';
  });
  const [activeCategory, setActiveCategory] = useState<'hazard' | 'component' | 'method' | 'output'>('hazard');

  // Custom additions, edits, and deletions with local storage persistence
  const [customItems, setCustomItems] = useState<PaletteItem[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PALETTE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editedItems, setEditedItems] = useState<Record<string, PaletteItem>>(() => {
    try {
      const saved = localStorage.getItem(EDITED_PALETTE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [deletedItemIds, setDeletedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DELETED_PALETTE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<PaletteItem | null>(null);
  const [modalDefaultType, setModalDefaultType] = useState<WorkflowNodeType>('hazard');

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PALETTE_KEY, JSON.stringify(customItems));
    } catch {}
  }, [customItems]);

  useEffect(() => {
    try {
      localStorage.setItem(EDITED_PALETTE_KEY, JSON.stringify(editedItems));
    } catch {}
  }, [editedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(DELETED_PALETTE_KEY, JSON.stringify(deletedItemIds));
    } catch {}
  }, [deletedItemIds]);

  useEffect(() => {
    if (activeGroup === 'ulasim' || activeGroup === 'teknikaltyapi' || activeGroup === 'lojistik') {
      setSelectedGroup(activeGroup);
    } else if (activeGroup === 'hepsi' || activeGroup === 'all') {
      setSelectedGroup('all');
    }
  }, [activeGroup]);

  // Extract master datasets and merge edits/custom/deletions
  const rawData = useMemo(() => extractPaletteData(), []);

  const mergedData = useMemo(() => {
    const processList = (defaultList: PaletteItem[]) => {
      return defaultList
        .filter(item => !deletedItemIds.includes(item.id))
        .map(item => (editedItems[item.id] ? { ...editedItems[item.id] } : item));
    };

    const baseHazards = processList(rawData.hazards);
    const baseComponents = processList(rawData.components);
    const baseMethods = processList(rawData.methods);
    const baseOutputs = processList(rawData.outputs);

    // Append custom items
    customItems
      .filter(item => !deletedItemIds.includes(item.id))
      .forEach(custom => {
        const resolved = editedItems[custom.id] || custom;
        if (resolved.type === 'hazard') {
          baseHazards.unshift(resolved);
        } else if (resolved.type === 'critical_component') {
          baseComponents.unshift(resolved);
        } else if (resolved.type === 'analysis_method') {
          baseMethods.unshift(resolved);
        } else if (resolved.type === 'intermediate_output' || resolved.type === 'integrated_assessment') {
          baseOutputs.unshift(resolved);
        }
      });

    return {
      hazards: baseHazards,
      components: baseComponents,
      methods: baseMethods,
      outputs: baseOutputs
    };
  }, [rawData, customItems, editedItems, deletedItemIds]);

  // Filter hazards
  const filteredHazards = useMemo(() => {
    return mergedData.hazards.filter(h => {
      if (selectedChapter !== 'all' && h.chapterNum !== selectedChapter) return false;
      if (selectedGroup !== 'all' && h.workingGroup !== selectedGroup && h.workingGroup !== 'hepsi') return false;
      if (searchTerm && !h.title.toLowerCase().includes(searchTerm.toLowerCase()) && !h.relatedHazard?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [mergedData.hazards, selectedChapter, selectedGroup, searchTerm]);

  // Filter components (Chapter 3 assets)
  const filteredComponents = useMemo(() => {
    return mergedData.components.filter(c => {
      if (selectedGroup !== 'all' && c.workingGroup !== selectedGroup && c.workingGroup !== 'hepsi') return false;
      if (searchTerm && !c.title.toLowerCase().includes(searchTerm.toLowerCase()) && !c.componentGroup?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [mergedData.components, selectedGroup, searchTerm]);

  // Filter methods
  const filteredMethods = useMemo(() => {
    return mergedData.methods.filter(m => {
      if (selectedChapter !== 'all' && m.chapterNum !== selectedChapter && m.chapterNum !== 'genel') return false;
      if (selectedGroup !== 'all' && m.workingGroup !== selectedGroup && m.workingGroup !== 'hepsi') return false;
      if (searchTerm && !m.title.toLowerCase().includes(searchTerm.toLowerCase()) && !m.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [mergedData.methods, selectedChapter, selectedGroup, searchTerm]);

  // Filter outputs
  const filteredOutputs = useMemo(() => {
    return mergedData.outputs.filter(o => {
      if (selectedChapter !== 'all' && o.chapterNum !== selectedChapter) return false;
      if (selectedGroup !== 'all' && o.workingGroup !== selectedGroup && o.workingGroup !== 'hepsi') return false;
      if (searchTerm && !o.title.toLowerCase().includes(searchTerm.toLowerCase()) && !o.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [mergedData.outputs, selectedChapter, selectedGroup, searchTerm]);

  const handleDragStart = (e: React.DragEvent, item: PaletteItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleOpenCreateModal = (category: 'hazard' | 'component' | 'method' | 'output') => {
    const typeMap: Record<string, WorkflowNodeType> = {
      hazard: 'hazard',
      component: 'critical_component',
      method: 'analysis_method',
      output: 'intermediate_output'
    };
    setModalMode('create');
    setSelectedItemToEdit(null);
    setModalDefaultType(typeMap[category] || 'hazard');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: PaletteItem) => {
    setModalMode('edit');
    setSelectedItemToEdit(item);
    setModalDefaultType(item.type);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    const isCustom = customItems.some(c => c.id === itemId);
    if (isCustom) {
      setCustomItems(prev => prev.filter(c => c.id !== itemId));
    } else {
      setDeletedItemIds(prev => [...prev, itemId]);
    }
    // Clean up from editedItems if present
    setEditedItems(prev => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleSaveItem = (savedItem: PaletteItem, andAddToCanvas = false) => {
    if (modalMode === 'create') {
      setCustomItems(prev => [savedItem, ...prev]);
    } else {
      const isCustom = savedItem.isCustom || customItems.some(c => c.id === savedItem.id);
      if (isCustom) {
        setCustomItems(prev => prev.map(c => c.id === savedItem.id ? savedItem : c));
      } else {
        setEditedItems(prev => ({
          ...prev,
          [savedItem.id]: savedItem
        }));
      }
    }

    if (andAddToCanvas) {
      onAddItem(savedItem);
    }
  };

  const handleResetCatalog = () => {
    setCustomItems([]);
    setEditedItems({});
    setDeletedItemIds([]);
    localStorage.removeItem(CUSTOM_PALETTE_KEY);
    localStorage.removeItem(EDITED_PALETTE_KEY);
    localStorage.removeItem(DELETED_PALETTE_KEY);
  };

  const hasModifications = customItems.length > 0 || Object.keys(editedItems).length > 0 || deletedItemIds.length > 0;

  if (!isOpen) {
    return (
      <button
        type="button"
        title="Bileşen Panelini Aç"
        onClick={onToggle}
        style={{
          position: 'absolute',
          left: 12,
          top: 12,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#334155',
          boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          cursor: 'pointer'
        }}
      >
        <ChevronRight size={14} />
        <span>Bileşen Kütüphanesi</span>
      </button>
    );
  }

  const categoryMeta = {
    hazard: { label: 'Tehlike', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    component: { label: 'Bileşen', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    method: { label: 'Analiz', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
    output: { label: 'Çıktı', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' }
  }[activeCategory];

  return (
    <>
      <div
        style={{
          width: '330px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 35,
          boxShadow: '2px 0 6px rgba(0,0,0,0.03)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 14px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Bileşen Kütüphanesi</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Sürükleyin, düzenleyin veya yeni ekleyin</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasModifications && (
              <button
                type="button"
                title="Kütüphaneyi Varsayılana Sıfırla"
                onClick={handleResetCatalog}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '10px'
                }}
              >
                <RotateCcw size={11} />
                <span>Sıfırla</span>
              </button>
            )}
            <button
              type="button"
              title="Paneli Kapat"
              onClick={onToggle}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>

        {/* Filter and Search Box */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 9, top: 8, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Kütüphanede ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px 6px 28px',
                fontSize: '11px',
                border: '1px solid #CBD5E1',
                borderRadius: '5px',
                backgroundColor: '#F8FAFC',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Chapter Filter */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
              Bölüm Filtresi:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {[
                { id: 'all', label: 'Tümü' },
                { id: '4', label: '4. Doğa Afet' },
                { id: '5', label: '5. İnsan/Tekn.' },
                { id: '6', label: '6. İklim Krizi' },
                { id: '8', label: '8. Çoklu Risk' }
              ].map(ch => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChapter(ch.id as any)}
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: selectedChapter === ch.id ? '1px solid #2563EB' : '1px solid #E2E8F0',
                    background: selectedChapter === ch.id ? '#EFF6FF' : '#F8FAFC',
                    color: selectedChapter === ch.id ? '#1D4ED8' : '#475569',
                    fontWeight: selectedChapter === ch.id ? 600 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <button
            type="button"
            onClick={() => setActiveCategory('hazard')}
            style={{
              flex: 1,
              padding: '8px 4px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeCategory === 'hazard' ? '2px solid #DC2626' : '2px solid transparent',
              background: activeCategory === 'hazard' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'hazard' ? '#DC2626' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
            title="Afet ve İklim Tehlikeleri"
          >
            <AlertTriangle size={12} />
            <span>Tehlike ({filteredHazards.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('component')}
            style={{
              flex: 1,
              padding: '8px 4px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeCategory === 'component' ? '2px solid #2563EB' : '2px solid transparent',
              background: activeCategory === 'component' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'component' ? '#2563EB' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
            title="Kritik Bileşenler (3. Bölüm CBS Katmanları)"
          >
            <Layers size={12} />
            <span>Bileşen ({filteredComponents.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('method')}
            style={{
              flex: 1,
              padding: '8px 4px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeCategory === 'method' ? '2px solid #D97706' : '2px solid transparent',
              background: activeCategory === 'method' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'method' ? '#D97706' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
            title="CBS Analiz Yöntemleri"
          >
            <Cpu size={12} />
            <span>Analiz ({filteredMethods.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('output')}
            style={{
              flex: 1,
              padding: '8px 4px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              borderBottom: activeCategory === 'output' ? '2px solid #059669' : '2px solid transparent',
              background: activeCategory === 'output' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'output' ? '#059669' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
            title="Ara ve Bütünleşik Çıktılar"
          >
            <FileCheck size={12} />
            <span>Çıktı ({filteredOutputs.length})</span>
          </button>
        </div>

        {/* Action Bar: Add New Item for Active Category */}
        <div
          style={{
            padding: '8px 12px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            type="button"
            onClick={() => handleOpenCreateModal(activeCategory)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: `1px dashed ${categoryMeta.border}`,
              backgroundColor: categoryMeta.bg,
              color: categoryMeta.color,
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 120ms ease'
            }}
          >
            <Plus size={13} />
            <span>+ Yeni {categoryMeta.label} Ekle</span>
          </button>
        </div>

        {/* Items Scrollable List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {activeCategory === 'hazard' && (
            filteredHazards.length === 0 ? (
              <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                Seçilen filtrelerde tehlike verisi bulunamadı.
              </div>
            ) : (
              filteredHazards.map(item => (
                <PaletteItemCard
                  key={item.id}
                  item={item}
                  isEdited={!!editedItems[item.id]}
                  onDragStart={handleDragStart}
                  onAdd={() => onAddItem(item)}
                  onEdit={() => handleOpenEditModal(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))
            )
          )}

          {activeCategory === 'component' && (
            filteredComponents.length === 0 ? (
              <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                Seçilen filtrelerde kritik bileşen katmanı bulunamadı.
              </div>
            ) : (
              filteredComponents.map(item => (
                <PaletteItemCard
                  key={item.id}
                  item={item}
                  isEdited={!!editedItems[item.id]}
                  onDragStart={handleDragStart}
                  onAdd={() => onAddItem(item)}
                  onEdit={() => handleOpenEditModal(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))
            )
          )}

          {activeCategory === 'method' && (
            filteredMethods.length === 0 ? (
              <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                Seçilen filtrelerde analiz yöntemi bulunamadı.
              </div>
            ) : (
              filteredMethods.map(item => (
                <PaletteItemCard
                  key={item.id}
                  item={item}
                  isEdited={!!editedItems[item.id]}
                  onDragStart={handleDragStart}
                  onAdd={() => onAddItem(item)}
                  onEdit={() => handleOpenEditModal(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))
            )
          )}

          {activeCategory === 'output' && (
            filteredOutputs.length === 0 ? (
              <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                Seçilen filtrelerde çıktı türü bulunamadı.
              </div>
            ) : (
              filteredOutputs.map(item => (
                <PaletteItemCard
                  key={item.id}
                  item={item}
                  isEdited={!!editedItems[item.id]}
                  onDragStart={handleDragStart}
                  onAdd={() => onAddItem(item)}
                  onEdit={() => handleOpenEditModal(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))
            )
          )}
        </div>
      </div>

      {/* Item Create / Edit Modal */}
      <PaletteItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        item={selectedItemToEdit}
        defaultType={modalDefaultType}
        activeGroup={activeGroup}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </>
  );
};

interface PaletteItemCardProps {
  item: PaletteItem;
  isEdited?: boolean;
  onDragStart: (e: React.DragEvent, item: PaletteItem) => void;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PaletteItemCard: React.FC<PaletteItemCardProps> = ({
  item,
  isEdited,
  onDragStart,
  onAdd,
  onEdit,
  onDelete
}) => {
  const meta = NODE_TYPE_META[item.type] || NODE_TYPE_META.hazard;

  const groupLabel = 
    item.workingGroup === 'ulasim' ? 'Ulaşım' :
    item.workingGroup === 'teknikaltyapi' ? 'Teknik Alt.' :
    item.workingGroup === 'lojistik' ? 'Lojistik' : 'Tümü';

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      style={{
        padding: '8px 10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
        border: isEdited ? `1px solid ${meta.color}` : '1px solid #E2E8F0',
        cursor: 'grab',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = meta.color;
        e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isEdited ? meta.color : '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              padding: '1px 5px',
              borderRadius: '3px',
              backgroundColor: meta.bgColor,
              color: meta.color,
              border: `1px solid ${meta.borderColor}`,
              textTransform: 'uppercase'
            }}
          >
            {meta.badge}
          </span>

          {item.chapterNum && item.chapterNum !== 'genel' && (
            <span style={{ fontSize: '9px', color: '#64748B', background: '#F1F5F9', padding: '1px 4px', borderRadius: '3px' }}>
              {item.chapterNum}. Bölüm
            </span>
          )}

          {item.workingGroup && item.workingGroup !== 'hepsi' && (
            <span style={{ fontSize: '9px', color: '#0369A1', background: '#E0F2FE', padding: '1px 4px', borderRadius: '3px' }}>
              {groupLabel}
            </span>
          )}

          {item.isCustom && (
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#7C3AED', background: '#F5F3FF', padding: '1px 4px', borderRadius: '3px' }}>
              Özel
            </span>
          )}

          {isEdited && !item.isCustom && (
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#D97706', background: '#FFFBEB', padding: '1px 4px', borderRadius: '3px' }}>
              Düzenlendi
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <button
            type="button"
            title="Öğeyi Düzenle"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              borderRadius: '4px',
              color: '#64748B',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Pencil size={10} />
          </button>

          <button
            type="button"
            title="Öğeyi Sil"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              border: '1px solid #FEE2E2',
              background: '#FEF2F2',
              borderRadius: '4px',
              color: '#DC2626',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Trash2 size={10} />
          </button>

          <button
            type="button"
            title="Şemaya Ekle"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            style={{
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              borderRadius: '4px',
              color: '#0F172A',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <Plus size={10} /> Ekle
          </button>
        </div>
      </div>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#0F172A',
          lineHeight: 1.35,
          fontFamily: item.title.includes('_') ? 'monospace, sans-serif' : 'inherit'
        }}
      >
        {item.title}
      </div>

      {(item.componentGroup || item.relatedHazard || item.analysisMethod || item.dataSource) && (
        <div style={{ fontSize: '10px', color: '#64748B', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.componentGroup || item.relatedHazard || item.analysisMethod || item.dataSource}
        </div>
      )}
    </div>
  );
};
