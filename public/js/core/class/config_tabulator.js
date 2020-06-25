class TableTabulator {

    constructor(url, columns, id) {
        this.id = id;
        this.url = url;
        this.columns = columns;
    }

    createTable() {
        return new Tabulator(this.id, this.createConfigTable());
    }

    createConfigTable() {
        const config = {
            ajaxURL: this.url,
            layout: "fitColumns",
            pagination: "local",
            paginationSize: 10,
            movableColumns: true,
            resizableRows: true,
            columns:this.columns
        };
        return config;
    }


}
export default TableTabulator;