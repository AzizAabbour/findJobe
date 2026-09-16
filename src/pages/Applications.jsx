import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  PlusIcon,
  PaperPlaneIcon,
  TrashIcon,
  Cross2Icon
} from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { applicationService, APPLICATION_STATUSES } from '../services/applicationService';
import { ApplicationCard } from '../components/ApplicationCard';
import { ConfirmModal } from '../components/ApplicationModal';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/formatDate';

const KANBAN_COLUMNS = [
  { id: 'NEW', title: 'Nouveau', statusKey: 'NEW', color: 'var(--status-new)' },
  { id: 'READY', title: 'Prêt', statusKey: 'READY', color: 'var(--status-ready)' },
  { id: 'SENT', title: 'Envoyé', statusKey: 'SENT', color: 'var(--status-sent)' },
  { id: 'FOLLOW-UP', title: 'Relance', statusKey: 'FOLLOW_UP', color: 'var(--status-followup)' },
  { id: 'INTERVIEW', title: 'Entretien', statusKey: 'INTERVIEW', color: 'var(--status-interview)' },
  { id: 'REJECTED', title: 'Refusé', statusKey: 'REJECTED', color: 'var(--status-rejected)' },
  { id: 'ACCEPTED', title: 'Accepté / Offre', statusKey: 'ACCEPTED', color: 'var(--status-accepted)' }
];

export const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(applicationService.getAll());
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const { showSuccess } = useToast();

  const reloadApps = () => {
    setApplications([...applicationService.getAll()]);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newStatus = destination.droppableId;
    applicationService.updateStatus(draggableId, newStatus);
    reloadApps();
    showSuccess(`Statut mis à jour : ${newStatus}`);
  };

  const handleOpenDetails = (app) => {
    setSelectedApp(app);
    setEditingNotes(app.notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedApp) return;
    applicationService.update(selectedApp.id, { notes: editingNotes });
    setSelectedApp(prev => ({ ...prev, notes: editingNotes }));
    reloadApps();
    showSuccess("Notes de candidature enregistrées.");
  };

  const handleStatusChangeInModal = (newStatus) => {
    if (!selectedApp) return;
    applicationService.updateStatus(selectedApp.id, newStatus);
    setSelectedApp(prev => ({ ...prev, status: newStatus }));
    reloadApps();
    showSuccess(`Statut changé pour "${newStatus}"`);
  };

  const handleTriggerFollowUp = (app) => {
    navigate(`/assistant?followUpId=${app.id}`);
  };

  const handleDeleteClick = (appId) => {
    setAppToDelete(appId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (appToDelete) {
      applicationService.delete(appToDelete);
      if (selectedApp && selectedApp.id === appToDelete) {
        setSelectedApp(null);
      }
      reloadApps();
      showSuccess("Candidature supprimée de votre suivi.");
    }
  };

  const stats = applicationService.getStats();

  return (
    <div className="page-container" style={{ maxWidth: '100%' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Pipeline & Suivi Actif
          </span>
          <h1 className="page-title">Centre de Candidatures (Tableau Kanban)</h1>
          <p className="page-subtitle">
            Glissez-déposez vos candidatures entre les colonnes pour suivre l'avancement de vos démarches et planifier vos relances.
          </p>
        </div>

        <Link to="/assistant" className="btn btn-primary btn-sm">
          <PlusIcon width={14} height={14} /> Nouvelle Candidature
        </Link>
      </div>

      {/* Summary KPI Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.65rem',
        marginBottom: '1.75rem'
      }}>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>{stats.total}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Démarches</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-ready)' }}>{stats.pending}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>En Préparation</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-sent)' }}>{stats.sent}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Envoyées</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-followup)' }}>{stats.followUp}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Relance Requise</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-interview)' }}>{stats.interview}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Entretiens</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-accepted)' }}>{stats.accepted}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Offres Reçues</div>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--status-rejected)' }}>{stats.rejected}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Refusées</div>
        </div>
      </div>

      {/* Kanban Board Container with horizontal scroll */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '2rem',
          minHeight: '500px'
        }}>
          {KANBAN_COLUMNS.map((column) => {
            const columnApps = applications.filter(app => app.status === column.id);

            return (
              <div
                key={column.id}
                style={{
                  flex: '0 0 280px',
                  background: '#141414',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(100vh - 280px)'
                }}
              >
                {/* Column Header */}
                <div style={{
                  padding: '0.85rem 1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: column.color
                      }}
                    />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFF' }}>
                      {column.title}
                    </span>
                  </div>
                  <span
                    className="badge badge-gray"
                    style={{ fontSize: '0.68rem', padding: '0.12rem 0.45rem' }}
                  >
                    {columnApps.length}
                  </span>
                </div>

                {/* Droppable cards column */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        padding: '0.75rem',
                        flex: 1,
                        overflowY: 'auto',
                        background: snapshot.isDraggingOver ? 'rgba(155, 120, 66, 0.08)' : 'transparent',
                        transition: 'background 0.2s ease',
                        minHeight: '120px'
                      }}
                    >
                      {columnApps.map((app, index) => (
                        <Draggable key={app.id} draggableId={app.id} index={index}>
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              style={{
                                ...dragProvided.draggableProps.style,
                                opacity: dragSnapshot.isDragging ? 0.85 : 1
                              }}
                            >
                              <ApplicationCard
                                application={app}
                                onOpenDetails={() => handleOpenDetails(app)}
                                onDelete={handleDeleteClick}
                                onFollowUp={handleTriggerFollowUp}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {columnApps.length === 0 && (
                        <div style={{
                          textAlign: 'center',
                          padding: '2rem 0.75rem',
                          color: 'var(--text-muted)',
                          fontSize: '0.78rem',
                          border: '1px dashed var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          Glissez une candidature ici
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Application Detail Modal Drawer */}
      {selectedApp && (
        <div className="modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '1.75rem', maxWidth: '620px' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
                  Fiche Candidature
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF' }}>{selectedApp.jobTitle}</h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-gold-light)', fontWeight: 600, marginTop: '0.15rem' }}>
                  {selectedApp.companyName} • {selectedApp.city}
                </div>
              </div>

              <button onClick={() => setSelectedApp(null)} className="btn btn-secondary btn-icon" aria-label="Fermer">
                <Cross2Icon width={16} height={16} />
              </button>
            </div>

            {/* Status Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }}>
                Statut de la démarche :
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {KANBAN_COLUMNS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleStatusChangeInModal(col.id)}
                    className="btn btn-sm"
                    style={{
                      fontSize: '0.74rem',
                      padding: '0.25rem 0.55rem',
                      background: selectedApp.status === col.id ? col.color : 'rgba(255, 255, 255, 0.05)',
                      color: selectedApp.status === col.id ? '#070707' : 'var(--text-secondary)',
                      fontWeight: 700,
                      border: `1px solid ${selectedApp.status === col.id ? col.color : 'var(--border-subtle)'}`
                    }}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata Info */}
            <div style={{
              background: 'var(--bg-elevated)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.15rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.65rem',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Date d'envoi :</span>
                <span style={{ fontWeight: 600, color: '#FFF' }}>
                  {selectedApp.sentDate ? formatDate(selectedApp.sentDate) : 'Non encore envoyée'}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Date de relance prévue :</span>
                <span style={{ fontWeight: 600, color: '#FBBF24' }}>
                  {selectedApp.followUpDate ? formatDate(selectedApp.followUpDate) : 'N/A'}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>CV utilisé :</span>
                <span style={{ fontWeight: 600, color: '#34D399' }}>
                  {selectedApp.cvUsed || 'CV_Abdelaziz_Aabbour.pdf'}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Email destinataire :</span>
                <span style={{ fontWeight: 600, color: 'var(--color-gold-light)' }}>
                  {selectedApp.recipientEmail || 'Non spécifié'}
                </span>
              </div>
            </div>

            {/* Notes Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Notes personnelles & Déroulement de l'entretien :
                </label>
                <button type="button" onClick={handleSaveNotes} className="btn btn-gold-outline btn-sm" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                  Sauvegarder notes
                </button>
              </div>
              <textarea
                rows={3}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="Ex: Entretien technique passé avec le Tech Lead..."
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>

            {/* Sent message preview if available */}
            {selectedApp.messageSent && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Message / Lettre transmise :
                </label>
                <div style={{
                  background: 'var(--bg-primary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  maxHeight: '110px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedApp.messageSent}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={() => handleDeleteClick(selectedApp.id)}
                className="btn btn-danger btn-sm"
              >
                <TrashIcon width={13} height={13} /> Supprimer
              </button>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => handleTriggerFollowUp(selectedApp)}
                  className="btn btn-gold-outline btn-sm"
                >
                  <PaperPlaneIcon width={12} height={12} /> Préparer une relance
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="btn btn-primary btn-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette candidature ?"
        message="Cette action retirera la candidature de votre tableau de bord et de l'historique."
        confirmText="Supprimer"
        isDanger={true}
      />
    </div>
  );
};
