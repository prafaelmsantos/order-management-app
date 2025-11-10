import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ProductRow {
  reference: string;
  color?: string;
  unitPrice: number;
  totalQuantity: number;
  totalPrice: number;
  quantities: Record<string, number | string>; // números ou string vazia
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
  const divRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("relatorio.pdf");
  };

  return (
    <>
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

      <div
        ref={divRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          padding: 30,
          backgroundColor: "#fff",
          width: 1200,
          color: "#000",
          fontFamily: "Arial, sans-serif"
        }}
      >
        {/* Cabeçalho */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <img src={logoUrl} alt="Logo" width={100} />
          <h1 style={{ textAlign: "center", flex: 1, margin: 0 }}>{title}</h1>
        </div>

        {/* Informações do Cliente */}
        {customer && (
          <div style={{ marginBottom: 25 }}>
            <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: 5 }}>
              Cliente
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              <p>
                <strong>Nome:</strong> {customer.fullName}
              </p>
              <p>
                <strong>NIF:</strong> {customer.taxIdentificationNumber}
              </p>
              <p>
                <strong>Contacto:</strong> {customer.contact}
              </p>
              <p>
                <strong>Morada:</strong> {customer.address}
              </p>
              <p>
                <strong>Código Postal:</strong> {customer.postalCode}
              </p>
              <p>
                <strong>Cidade:</strong> {customer.city}
              </p>
            </div>
          </div>
        )}

        {/* Tabela de Produtos */}
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: 5 }}>
          Produtos
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
            marginTop: 10
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={{ border: "1px solid #000", padding: 6 }}>
                Referência
              </th>
              <th style={{ border: "1px solid #000", padding: 6 }}>Cor</th>
              <th style={{ border: "1px solid #000", padding: 6 }}>
                Preço Unit.
              </th>
              {products.length > 0 &&
                Object.keys(products[0].quantities).map((q) => (
                  <th
                    key={q}
                    style={{
                      border: "1px solid #000",
                      padding: 6,
                      width: `${
                        100 / Object.keys(products[0].quantities).length
                      }%`,
                      textAlign: "center"
                    }}
                  >
                    {q}
                  </th>
                ))}
              <th style={{ border: "1px solid #000", padding: 6 }}>
                Qtd. Total
              </th>
              <th style={{ border: "1px solid #000", padding: 6 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #000", padding: 6 }}>
                  {p.reference}
                </td>
                <td style={{ border: "1px solid #000", padding: 6 }}>
                  {p.color}
                </td>
                <td style={{ border: "1px solid #000", padding: 6 }}>
                  {p.unitPrice.toFixed(2)}
                </td>
                {Object.values(p.quantities).map((value, i) => (
                  <td
                    key={i}
                    style={{
                      border: "1px solid #000",
                      padding: 6,
                      width: `${100 / Object.values(p.quantities).length}%`,
                      textAlign: "center"
                    }}
                  >
                    {value}
                  </td>
                ))}
                <td style={{ border: "1px solid #000", padding: 6 }}>
                  {p.totalQuantity}
                </td>
                <td style={{ border: "1px solid #000", padding: 6 }}>
                  {p.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: 20, fontStyle: "italic", fontSize: 11 }}>
          Gerado automaticamente pelo sistema.
        </p>
      </div>
    </>
  );
};

export default ExportPDFButton;
