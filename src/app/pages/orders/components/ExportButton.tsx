import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IOrder } from "../models/Order";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface ExportButtonProps {
  title: string;
  order: IOrder;
}

const ExportButton: React.FC<ExportButtonProps> = ({ title, order }) => {
  const handleExport = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // --- Cabeçalho da Empresa ---
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Raith – Exportação de Têxteis, S.A.", 10, 10);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(
      "Zona Industrial de Tuías - Aptdo 64630-334 - Marco de Canavenses",
      10,
      14
    );
    pdf.text("Telefone: 351 255534211 | Email: geral@raithsa.com", 10, 18);

    // --- Cabeçalho da Encomenda ---
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`Encomenda nº ${order.id?.toString() || ""}`, 10, 28);

    // --- Linha divisória ---
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.2);
    pdf.line(10, 31, pageWidth - 10, 31);

    let startY = 40; // posição inicial da tabela

    // --- Cliente ---
    if (order.customer) {
      const labelX = 10; // posição X dos títulos
      const valueX = 50; // posição X dos valores
      const rightLabelX = 120; // coluna da direita para títulos
      const rightValueX = 160; // coluna da direita para valores

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("Nome:", labelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(order.customer.fullName || "", valueX, startY);

      pdf.setFont("helvetica", "bold");
      pdf.text("NIF:", rightLabelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        order.customer.taxIdentificationNumber || "",
        rightValueX,
        startY
      );

      startY += 5;

      pdf.setFont("helvetica", "bold");
      pdf.text("Contacto:", labelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(order.customer.contact || "", valueX, startY);

      pdf.setFont("helvetica", "bold");
      pdf.text("Cidade:", rightLabelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(order.customer.city || "", rightValueX, startY);

      startY += 5;

      pdf.setFont("helvetica", "bold");
      pdf.text("Morada:", labelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(order.customer.address || "", valueX, startY);

      startY += 5;

      pdf.setFont("helvetica", "bold");
      pdf.text("Código Postal:", labelX, startY);
      pdf.setFont("helvetica", "normal");
      pdf.text(order.customer.postalCode || "", valueX, startY);

      startY += 10;

      // Observações
      pdf.setFont("helvetica", "bold");
      pdf.text("Observações:", labelX, startY);
      startY += 5;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(order.observations ?? "", valueX, startY);
      startY += 10;
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
      0: { cellWidth: 20, halign: "center" },
      1: { cellWidth: 45, halign: "left" },
      2: { cellWidth: 16, halign: "center" },
      3: { cellWidth: 6, halign: "center" },
      4: { cellWidth: 6, halign: "center" },
      5: { cellWidth: 6, halign: "center" },
      6: { cellWidth: 6, halign: "center" },
      7: { cellWidth: 6, halign: "center" },
      8: { cellWidth: 6, halign: "center" },
      9: { cellWidth: 6, halign: "center" },
      10: { cellWidth: 6, halign: "center" },
      11: { cellWidth: 6, halign: "center" },
      12: { cellWidth: 6, halign: "center" },
      13: { cellWidth: 6, halign: "center" },
      14: { cellWidth: 6, halign: "center" },
      15: { cellWidth: 6, halign: "center" },
      16: { cellWidth: 6, halign: "center" },
      17: { cellWidth: 6, halign: "center" },
      18: { cellWidth: 6, halign: "center" },
      19: { cellWidth: 14, halign: "right" }
    };

    order.productsOrders.length > 0 &&
      autoTable(pdf, {
        head,
        body,
        startY,
        headStyles: {
          fontSize: 5,
          fontStyle: "bold",
          cellPadding: 2,
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        styles: {
          fontSize: 6,
          cellPadding: 2,
          halign: "center",
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        columnStyles,
        margin: { left: margin, right: margin },
        tableWidth: "auto",
        showHead: "everyPage",
        didDrawPage: (data) => {
          // Número da página
          const pageNumber = pdf.getCurrentPageInfo().pageNumber;
          const totalPages = pdf.getNumberOfPages();
          pdf.setFontSize(8);
          pdf.text(
            `Página ${pageNumber} / ${totalPages}`,
            pageWidth / 2,
            pageHeight - 5,
            { align: "center" }
          );
        }
      });

    //pdf.output("dataurlnewwindow");
    pdf.save(`nota_encomenda_n_${order.id?.toString()}.pdf`);
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
