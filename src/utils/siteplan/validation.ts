import type { BookingData, ValidationResult } from '@/src/types/siteplan/models';

/**
 * Validate marketing booking form data.
 *
 * This follows the business rules from the requirements:
 * - Nama calon pembeli wajib diisi
 * - Nomor HP mengikuti pola umum Indonesia (+62, 62, atau 0 diikuti 9-12 digit)
 * - File KK dan KTP wajib diupload (validasi tipe & size dilakukan terpisah)
 */
export const validateBookingData = (data: BookingData): ValidationResult => {
  const errors: string[] = [];

  if (!data.namaCalonPembeli || !data.namaCalonPembeli.trim()) {
    errors.push('Nama calon pembeli harus diisi');
  }

  if (!data.nomorHP || !/^(\+62|62|0)[0-9]{9,12}$/.test(data.nomorHP.trim())) {
    errors.push('Nomor HP tidak valid');
  }

  if (!data.kkFile) {
    errors.push('File KK harus diupload');
  }

  if (!data.ktpFile) {
    errors.push('File KTP harus diupload');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export interface FileValidationOptions {
  maxSizeMB?: number;
  /**
   * Allowed MIME types (default: JPG, PNG, PDF)
   */
  allowedTypes?: string[];
}

/**
 * Generic file validation helper for KK/KTP and similar documents.
 *
 * Requirements:
 * - Accept only JPG, PNG, or PDF
 * - Max size 5MB (default, configurable)
 */
export const validateDocumentFile = (
  file: File,
  options: FileValidationOptions = {},
): ValidationResult => {
  const maxSizeMB = options.maxSizeMB ?? 5;
  const allowedTypes =
    options.allowedTypes ?? ['image/jpeg', 'image/png', 'application/pdf'];

  const errors: string[] = [];

  if (file.size > maxSizeMB * 1024 * 1024) {
    errors.push(`Ukuran file maksimal ${maxSizeMB}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Format file harus JPG, PNG, atau PDF');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};