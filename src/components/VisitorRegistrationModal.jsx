import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const VisitorRegistrationModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:py-10">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onClose?.()}
        role="presentation"
      ></div>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0C0D11] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#C9A63B]">Formulir Pendaftaran</p>
            <h2 className="text-xl font-semibold sm:text-2xl">Pendaftaran Visitor</h2>
          </div>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="h-10 w-10 rounded-full border border-white/10 text-white/70 transition hover:border-[#D4AF37]/60 hover:text-white"
            aria-label="Tutup"
          >
            <X className="mx-auto h-5 w-5" />
          </button>
        </div>

        <form className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-200">
                Nama Depan <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama depan"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-200">
                Nama Belakang <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama belakang"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
            <div>
              <label className="text-base font-semibold text-gray-200">
                Email <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
            <div>
              <label className="text-base font-semibold text-gray-200">
                No. Kontak <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="tel"
                placeholder="+62..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
            <div>
              <label className="text-base font-semibold text-gray-200">
                Jabatan <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Director"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
            <div>
              <label className="text-base font-semibold text-gray-200">
                Nama Perusahaan <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama perusahaan"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-base font-semibold text-gray-200">Pesan</label>
            <textarea
              rows={4}
              placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#12141A] px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-gray-500 focus:border-[#C9A63B] focus:ring-2 focus:ring-[#C9A63B]/20"
            ></textarea>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Dengan menekan tombol kirim, Anda menyetujui syarat dan ketentuan serta kebijakan privasi kami.
          </p>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#C9A63B] py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0A0A0F] transition hover:bg-[#D7B654]"
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </div>
  );
};
