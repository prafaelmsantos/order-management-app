import Box from "@mui/material/Box";
import PageContainer from "../../components/PageContainer";
import { useEffect, useState } from "react";
import { IProductTable } from "../products/models/Product";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TextField, InputAdornment, Button } from "@mui/material";

interface PagedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export default function DashboardPage() {
  const [rows, setRows] = useState<IProductTable[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState<string>("");

  console.log(filterText);

  // --- PAGINAÇÃO ---
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5
  });

  // --- Fetch de dados do backend ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        pageNumber: String(paginationModel.page + 1),
        pageSize: String(paginationModel.pageSize)
      });
      if (filterText) params.append("filter", filterText);

      const response = await fetch(
        `http://localhost:5006/ordermanagement/api/v1/products/newtable?${params.toString()}`
      );

      if (!response.ok) throw new Error("Erro ao carregar produtos");

      const data: PagedResult<IProductTable> = await response.json();
      setRows(data.items);
      setRowCount(data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- Sempre que a página mudar, busca os dados ---
  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  // --- Colunas da tabela ---
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "reference", headerName: "Nome", flex: 1 },
    { field: "price", headerName: "Preço", width: 140, type: "number" }
  ];

  return (
    <PageContainer title="Início" breadcrumbs={[{ title: "Início" }]}>
      <Box
        sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, mb: 2 }}
      >
        <TextField
          fullWidth
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
          placeholder="Pesquisar..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {filterText && (
                  <CancelIcon
                    fontSize="small"
                    style={{ cursor: "pointer", marginRight: 8 }}
                    onClick={() => {
                      setFilterText("");
                      //fetchData();
                    }}
                  />
                )}
                <Button size="small" variant="contained" onClick={fetchData}>
                  Enviar
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
    </PageContainer>
  );
}
