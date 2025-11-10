import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ProductRow {
  reference: string;
  color?: string;
  unitPrice: number;
  totalQuantity: number;
  totalPrice: number;
  quantities: Record<string, number | string>; // 0 vira ""
}

interface CustomerInfo {
  fullName: string;
  taxIdentificationNumber: string;
  contact: string;
  address: string;
  city: string;
  postalCode: string;
}

interface ExportPDFButtonProps {
  logoUrl: string;
  title: string;
  customer?: CustomerInfo;
  products: ProductRow[];
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({
  logoUrl,
  title,
  customer,
  products
}) => {
  const handleExport = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Adiciona logo
    /* if (logoUrl) {
      const img = new Image();
      img.src = logoUrl;
      await new Promise((resolve) => {
        img.onload = () => {
          const ratio = img.width / img.height;
          const imgWidth = 30; // largura em mm
          const imgHeight = imgWidth / ratio;
          pdf.addImage(img, "PNG", 10, 10, imgWidth, imgHeight);
          resolve(true);
        };
      });
    } */

    // Título
    pdf.setFontSize(18);
    pdf.text(title, pageWidth / 2, 25, { align: "center" });

    let currentY = 35;

    // Cliente
    if (customer) {
      pdf.setFontSize(14);
      pdf.text("Cliente", 10, currentY);
      currentY += 6;

      pdf.setFontSize(10);
      pdf.text(`Nome: ${customer.fullName}`, 10, currentY);
      pdf.text(`NIF: ${customer.taxIdentificationNumber}`, 80, currentY);
      currentY += 6;
      pdf.text(`Contacto: ${customer.contact}`, 10, currentY);
      pdf.text(`Morada: ${customer.address}`, 80, currentY);
      currentY += 6;
      pdf.text(`Código Postal: ${customer.postalCode}`, 10, currentY);
      pdf.text(`Cidade: ${customer.city}`, 80, currentY);
      currentY += 10;
    }

    // Preparar colunas
    const quantidadeKeys =
      products.length > 0 ? Object.keys(products[0].quantities) : [];

    const head = [
      "Referência",
      "Cor",
      "Preço Unit.",
      ...quantidadeKeys,
      "Qtd. Total",
      "Total"
    ];

    // Preparar linhas
    const body = products.map((p) => [
      p.reference,
      p.color || "",
      p.unitPrice.toFixed(2),
      ...quantidadeKeys.map((k) =>
        p.quantities[k] === 0 ? "" : p.quantities[k]
      ),
      p.totalQuantity,
      p.totalPrice.toFixed(2)
    ]);

    autoTable(pdf, {
      head: [head],
      body: body,
      startY: currentY,
      //theme: "grid",
      styles: {
        fontSize: 6, // aplica a todas as células
        cellPadding: 1
      },
      headStyles: {
        fontSize: 6 // opcional, mas garante que o cabeçalho também fique 8
      },
      margin: { left: 10, right: 10 },
      columnStyles: {
        0: { cellWidth: 30 }, // Referência
        1: { cellWidth: 20 } // Cor

        // as colunas de quantidade e totais vão se ajustar automaticamente
      },
      didDrawPage: (data) => {
        // opcional: rodapé
      }
    });

    pdf.save("relatorio.pdf");
  };

  return (
    <button
      onClick={handleExport}
      style={{
        padding: "8px 16px",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer"
      }}
    >
      Exportar PDF
    </button>
  );
};

export default ExportPDFButton;
