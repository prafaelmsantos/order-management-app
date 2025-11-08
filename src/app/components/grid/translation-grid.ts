export const ptPTDataGrid = {
  // Labels gerais
  noRowsLabel: "Nenhum resultado encontrado.",
  noResultsOverlayLabel: "Nenhum resultado encontrado.",
  noColumnsOverlayLabel: "Nenhuma coluna disponível.",
  noColumnsOverlayManageColumns: "Gerir colunas",
  emptyPivotOverlayLabel: "Nenhum dado para pivô",

  // Toolbar
  toolbarDensity: "Densidade",
  toolbarDensityLabel: "Densidade da linha",
  toolbarDensityCompact: "Compacta",
  toolbarDensityStandard: "Padrão",
  toolbarDensityComfortable: "Confortável",
  toolbarColumns: "Colunas",
  toolbarColumnsLabel: "Gerir colunas",
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Gerir filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Mostrar filtros",
  toolbarFiltersTooltipActive: (count: number) => `${count} filtro(s) ativo(s)`,
  toolbarQuickFilterPlaceholder: "Procurar...",
  toolbarQuickFilterLabel: "Filtro rápido",
  toolbarQuickFilterDeleteIconLabel: "Limpar",
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Exportar CSV",
  toolbarExportPrint: "Imprimir",
  toolbarExportExcel: "Exportar Excel",
  toolbarPivot: "Pivô",
  toolbarCharts: "Gráficos",
  toolbarAssistant: "Assistente IA",

  // Gestão de colunas
  columnsManagementSearchTitle: "Procurar colunas",
  columnsManagementNoColumns: "Nenhuma coluna",
  columnsManagementShowHideAllText: "Mostrar/Ocultar tudo",
  columnsManagementReset: "Redefinir",
  columnsManagementDeleteIconLabel: "Remover coluna",

  // Painel de filtros
  filterPanelAddFilter: "Adicionar filtro",
  filterPanelRemoveAll: "Remover todos",
  filterPanelDeleteIconLabel: "Remover",
  filterPanelLogicOperator: "Operador lógico",
  filterPanelOperator: "Operador",
  filterPanelOperatorAnd: "E",
  filterPanelOperatorOr: "Ou",
  filterPanelColumns: "Colunas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Valor do filtro...",

  // Operadores de filtro
  filterOperatorContains: "Contém",
  filterOperatorDoesNotContain: "Não contém",
  filterOperatorEquals: "Igual",
  filterOperatorDoesNotEqual: "Diferente",
  filterOperatorStartsWith: "Começa por",
  filterOperatorEndsWith: "Termina em",
  filterOperatorIs: "É",
  filterOperatorNot: "Não é",
  filterOperatorAfter: "Depois de",
  filterOperatorOnOrAfter: "Em ou depois",
  filterOperatorBefore: "Antes de",
  filterOperatorOnOrBefore: "Em ou antes",
  filterOperatorIsEmpty: "Está vazio",
  filterOperatorIsNotEmpty: "Não está vazio",
  filterOperatorIsAnyOf: "É um dos",
  "filterOperator=": "Igual",
  "filterOperator!=": "Diferente",
  "filterOperator>": "Maior que",
  "filterOperator>=": "Maior ou igual a",
  "filterOperator<": "Menor que",
  "filterOperator<=": "Menor ou igual a",

  // Filtros no header
  headerFilterOperatorContains: "Contém",
  headerFilterOperatorDoesNotContain: "Não contém",
  headerFilterOperatorEquals: "Igual",
  headerFilterOperatorDoesNotEqual: "Diferente",
  headerFilterOperatorStartsWith: "Começa por",
  headerFilterOperatorEndsWith: "Termina em",
  headerFilterOperatorIs: "É",
  headerFilterOperatorNot: "Não é",
  headerFilterOperatorAfter: "Depois de",
  headerFilterOperatorOnOrAfter: "Em ou depois",
  headerFilterOperatorBefore: "Antes de",
  headerFilterOperatorOnOrBefore: "Em ou antes",
  headerFilterOperatorIsEmpty: "Está vazio",
  headerFilterOperatorIsNotEmpty: "Não está vazio",
  headerFilterOperatorIsAnyOf: "É um dos",
  "headerFilterOperator=": "Igual",
  "headerFilterOperator!=": "Diferente",
  "headerFilterOperator>": "Maior que",
  "headerFilterOperator>=": "Maior ou igual a",
  "headerFilterOperator<": "Menor que",
  "headerFilterOperator<=": "Menor ou igual a",
  headerFilterClear: "Limpar filtro",
  filterValueAny: "Qualquer",
  filterValueTrue: "Sim",
  filterValueFalse: "Não",

  // Menu de coluna
  columnMenuLabel: "Menu",
  columnMenuAriaLabel: (columnName: string) => `Menu da coluna ${columnName}`,
  columnMenuShowColumns: "Mostrar colunas",
  columnMenuManageColumns: "Gerir colunas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Desordenar",
  columnMenuSortAsc: "Ordenar crescente",
  columnMenuSortDesc: "Ordenar decrescente",
  columnMenuManagePivot: "Gerir pivô",
  columnMenuManageCharts: "Gerir gráficos",

  // Header
  columnHeaderFiltersTooltipActive: (count: number) =>
    `${count} filtro(s) ativo(s)`,
  columnHeaderFiltersLabel: "Mostrar filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Footer
  footerRowSelected: (count: number) => `${count} linha(s) selecionada(s)`,
  footerTotalRows: "Total de linhas:",
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${visibleCount} de ${totalCount}`,

  // Checkbox selection
  checkboxSelectionHeaderName: "Selecionar",
  checkboxSelectionSelectAllRows: "Selecionar todas as linhas",
  checkboxSelectionUnselectAllRows: "Desmarcar todas as linhas",
  checkboxSelectionSelectRow: "Selecionar linha",
  checkboxSelectionUnselectRow: "Desmarcar linha",

  // Boolean
  booleanCellTrueLabel: "Sim",
  booleanCellFalseLabel: "Não",

  // Actions
  actionsCellMore: "Mais ações",

  // Pinning
  pinToLeft: "Fixar à esquerda",
  pinToRight: "Fixar à direita",
  unpin: "Desafixar",

  // Agrupamento e árvore
  treeDataGroupingHeaderName: "Agrupar",
  treeDataExpand: "Expandir",
  treeDataCollapse: "Recolher",
  groupingColumnHeaderName: "Agrupar",
  groupColumn: (name: string) => `Agrupar por ${name}`,
  unGroupColumn: (name: string) => `Desagrupar ${name}`,

  // Painel de detalhes
  detailPanelToggle: "Painel de detalhes",
  expandDetailPanel: "Expandir",
  collapseDetailPanel: "Recolher",

  // Reordenação
  rowReorderingHeaderName: "Reordenar",

  // Funções de agregação
  aggregationMenuItemHeader: "Agregação",
  aggregationFunctionLabelNone: "Nenhuma",
  aggregationFunctionLabelSum: "Soma",
  aggregationFunctionLabelAvg: "Média",
  aggregationFunctionLabelMin: "Mínimo",
  aggregationFunctionLabelMax: "Máximo",
  aggregationFunctionLabelSize: "Tamanho",

  // Paginação
  paginationRowsPerPage: "Linhas por página",
  paginationItemAriaLabel: (type: "first" | "last" | "previous" | "next") =>
    type === "first"
      ? "Primeira página"
      : type === "last"
      ? "Última página"
      : type === "previous"
      ? "Página anterior"
      : "Próxima página"
};
