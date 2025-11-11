import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IOrder } from "../../orders/models/Order";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface ExportButtonProps {
  title: string;
  order: IOrder;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  title,
  order
}: {
  title: string;
  order: IOrder;
}) => {
  const handleExport = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // --- Título ---
    pdf.setFontSize(18);
    pdf.text(title, pageWidth / 2, 20, { align: "center" });

    let currentY = 40;

    // --- Cliente ---
    if (order.customer) {
      pdf.setFontSize(12);
      pdf.text("Informações do Cliente", 10, currentY);
      currentY += 6;
      pdf.setFontSize(9);
      pdf.text(`Nome: ${order.customer.fullName}`, 10, currentY);
      pdf.text(`NIF: ${order.customer.taxIdentificationNumber}`, 100, currentY);
      currentY += 5;
      pdf.text(`Contacto: ${order.customer.contact}`, 10, currentY);
      pdf.text(`Cidade: ${order.customer.city}`, 100, currentY);
      currentY += 5;
      pdf.text(`Morada: ${order.customer.address}`, 10, currentY);
      currentY += 5;
      pdf.text(`Código Postal: ${order.customer.postalCode}`, 10, currentY);
      currentY += 10;
    }

    // --- Cabeçalhos das colunas ---
    const monthColumns = [
      "0 M",
      "1 M",
      "3 M",
      "6 M",
      "12 M",
      "18 M",
      "24 M",
      "36 M",
      "1 A",
      "2 A",
      "3 A",
      "4 A",
      "6 A",
      "8 A",
      "10 A",
      "12 A"
    ];

    const head = [
      ["Referência", "Descrição", "Cor", ...monthColumns, "Preço Unit. (€)"]
    ];

    // --- Corpo da tabela ---
    const body = order.productsOrders.map((p) => [
      p.product?.reference ?? "",
      p.product?.description ?? "",
      p.color ?? "",
      p.zeroMonths ?? "",
      p.oneMonth ?? "",
      p.threeMonths ?? "",
      p.sixMonths ?? "",
      p.twelveMonths ?? "",
      p.eighteenMonths ?? "",
      p.twentyFourMonths ?? "",
      p.thirtySixMonths ?? "",
      p.oneYear ?? "",
      p.twoYears ?? "",
      p.threeYears ?? "",
      p.fourYears ?? "",
      p.sixYears ?? "",
      p.eightYears ?? "",
      p.tenYears ?? "",
      p.twelveYears ?? "",
      p.unitPrice ?? ""
    ]);

    const columnStyles: Record<number, any> = {
      0: { cellWidth: 18, halign: "left" }, // Referência
      1: { cellWidth: 42, halign: "left" }, // Descrição
      2: { cellWidth: 14, halign: "center" }, // Cor
      3: { cellWidth: 6, halign: "center" }, // 0 Meses
      4: { cellWidth: 6, halign: "center" }, // 1 Mês
      5: { cellWidth: 6, halign: "center" }, // 3 Meses
      6: { cellWidth: 6, halign: "center" }, // 6 Meses
      7: { cellWidth: 6, halign: "center" }, // 12 Meses
      8: { cellWidth: 6, halign: "center" }, // 18 Meses
      9: { cellWidth: 6, halign: "center" }, // 24 Meses
      10: { cellWidth: 6, halign: "center" }, // 36 Meses
      11: { cellWidth: 6, halign: "center" }, // 1 Ano
      12: { cellWidth: 6, halign: "center" }, // 2 Anos
      13: { cellWidth: 6, halign: "center" }, // 3 Anos
      14: { cellWidth: 6, halign: "center" }, // 4 Anos
      15: { cellWidth: 6, halign: "center" }, // 6 Anos
      16: { cellWidth: 6, halign: "center" }, // 8 Anos
      17: { cellWidth: 6, halign: "center" }, // 10 Anos
      18: { cellWidth: 6, halign: "center" }, // 12 Anos
      19: { cellWidth: 14, halign: "right" } // Preço Unit.
    };

    // --- Grelha ---
    autoTable(pdf, {
      head,
      body,
      startY: currentY,
      //theme: "grid",
      headStyles: { fontSize: 5, fontStyle: "bold" },
      styles: { fontSize: 6, cellPadding: 1, halign: "center" },
      columnStyles,
      margin: { left: 10, right: 10 },
      tableWidth: "auto"
    });

    pdf.save(`nota_encomenda_n_${order.id}.pdf`);
  };

  return (
    <Button
      variant="contained"
      onClick={handleExport}
      startIcon={<DownloadIcon />}
    >
      Exportar
    </Button>
  );
};

export default ExportButton;
