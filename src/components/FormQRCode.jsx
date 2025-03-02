import React from 'react';
import QRCode from 'qrcode.react';

const FormQRCode = ({ url }) => {
  return (
    <div className="text-center p-6 border rounded-lg shadow-md max-w-xs mx-auto">
      <h2 className="text-xl font-bold mb-4">Scan to Register</h2>
      <QRCode value={url} size={200} />
      <p className="mt-4 text-sm text-gray-600">Scan this QR code to access the photo shoot registration form</p>
    </div>
  );
};

export default FormQRCode;