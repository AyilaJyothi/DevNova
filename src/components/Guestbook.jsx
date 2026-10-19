import React, { useState } from 'react';
import { Send, Sparkles, Heart, ChevronLeft, ChevronRight, X, Mail } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import './Guestbook.css';

export default function Guestbook({ isNight, notes, onAddNote, onToggleHeart }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);

  const { playChime, playPop } = useSound();

  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(notes.length / PAGE_SIZE) || 1;
  const displayedNotes = notes.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    playChime(659.25, 'sine', 0.5);
    onAddNote(author, text);
    setAuthor('');
    setText('');
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      playPop();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      playPop();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleOpenNote = (note) => {
    playPop();
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    playPop();
    setSelectedNote(null);
  };

  return (
    <section id="guestbook" className="guestbook-section">
      <div className="guestbook-header">
        <span className="section-tag font-bubbly">Midnight Mailbox</span>
        <h2 className="section-title font-serif-dream">Leave Pip a Bedtime Wish</h2>
        <p className="font-bubbly guestbook-subtitle">
          Got a dream request or a sweet note for Pip's nursery log? Post your postcard below!
        </p>
      </div>

      <div className="guestbook-container">
        {/* Write Postcard Form */}
        <div className="guestbook-form-card" style={{ backgroundColor: isNight ? '#211833' : '#ffffff' }}>
          <h3 className="font-serif-dream form-card-title">
            <Send size={16} color="#a34063" /> Write Postcard
          </h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="font-bubbly input-label">Your Name / Title:</label>
              <input
                type="text"
                required
                placeholder="e.g. Sleepless Squirrel, Dreamer Maya"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="guestbook-input"
              />
            </div>

            <div>
              <label className="font-bubbly input-label">Your Message or Dream Wish:</label>
              <textarea
                required
                rows={4}
                placeholder="Write your bedtime wish or say hi to Pip..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="guestbook-textarea"
              />
            </div>

            <button type="submit" className="guestbook-submit-btn font-bubbly">
              <Sparkles size={16} /> Send to Nursery Mailbox
            </button>
          </form>
        </div>

        {/* 6-Card Compact Grid & Pagination */}
        <div className="guestbook-grid-wrapper">
          <div className="guestbook-compact-grid">
            {displayedNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleOpenNote(note)}
                className="guestbook-mini-card"
                style={{ backgroundColor: isNight ? '#261b3b' : '#ffffff' }}
              >
                <div className="mini-card-icon">
                  <Mail size={16} color="#a34063" />
                </div>
                <h4 className="font-serif-dream mini-card-author">{note.author}</h4>
                <span className="mini-card-time">{note.time}</span>
                <span className="mini-card-click-hint font-bubbly">Tap to read ✦</span>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="guestbook-pagination font-bubbly">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="pagination-btn"
                title="Previous 6 cards"
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <span className="pagination-info">
                Page {currentPage + 1} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="pagination-btn"
                title="Next 6 cards"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal on Click */}
      {selectedNote && (
        <div className="note-modal-overlay" onClick={handleCloseModal}>
          <div
            className="note-modal-card"
            style={{ backgroundColor: isNight ? '#24173d' : '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="note-modal-close" onClick={handleCloseModal}>
              <X size={18} />
            </button>

            <div className="note-modal-header">
              <div className="note-modal-badge font-bubbly">Nursery Postcard</div>
              <h3 className="font-serif-dream note-modal-author">{selectedNote.author}</h3>
              <span className="note-modal-time">{selectedNote.time}</span>
            </div>

            <div className="note-modal-body font-bubbly">
              <p>“{selectedNote.text}”</p>
            </div>

            <div className="note-modal-footer">
              <span className="font-bubbly note-modal-status">Status: Read by Pip 💤</span>
              <button
                onClick={() => {
                  playPop();
                  onToggleHeart(selectedNote.id);
                  setSelectedNote((prev) => (prev ? { ...prev, hearts: prev.hearts + 1 } : null));
                }}
                className="btn-heart-reaction font-bubbly"
              >
                <Heart size={16} fill="#a34063" color="#a34063" /> {selectedNote.hearts}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}