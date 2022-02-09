let app = new Vue({
  el: "#app",
  data() {
    return {
      showAlertSuccess: false,
      showAlertError: false,
      showTambahBarangModal: false,
      showEditBarangModal: false,
      showDeleteBarangModal: false,
      barangList: [],
      tambahBarangBaru: { nama: "", stok: "", keterangan: "" },
      selectedBarang: { nama: "", stok: "", keterangan: "" },
      errorMessage: "",
      successMessage: "",
    };
  },

  mounted() {
    this.readBarang();
  },

  //baca tanpa refresh
  watch: {
    successMessage(newVal) {
      if (newVal) {
        this.readBarang();
      }
    },
  },

  methods: {
    readBarang() {
      axios
        .get("http://localhost/crud-vuejs/barang.php?action=read")
        .then(function (response) {
          app.barangList = response.data.barang;
        });
    },

    createBarangBaru() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.tambahBarangBaru);

      axios
        .post("http://localhost/crud-vuejs/barang.php?action=create", formData)
        .then(function (response) {
          if (response.data.error) {
            app.errorMessage = response.data.message;
          } else {
            app.successMessage = response.data.message;
          }
          app.tambahBarangBaru = { nama: "", stok: "", keterangan: "" };
        });
    },

    updateBarangBaru() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.selectedBarang);

      axios
        .post("http://localhost/crud-vuejs/barang.php?action=update", formData)
        .then(function (response) {
          if (response.data.error) {
            app.errorMessage = response.data.message;
          } else {
            app.successMessage = response.data.message;
          }
        });
    },

    deleteBarang() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.selectedBarang);

      axios
        .post("http://localhost/crud-vuejs/barang.php?action=delete", formData)
        .then(function (response) {
          if (response.data.error) {
            app.errorMessage = response.data.message;
          } else {
            app.successMessage = response.data.message;
          }
          app.selectedBarang = { nama: "", stok: "", keterangan: "" };
        });
    },

    convertToFormData(data) {
      let fd = new FormData();
      for (value in data) {
        fd.append(value, data[value]);
      }
      return fd;
    },

    pilihBarang(barang) {
      app.selectedBarang = Object.assign({}, barang);
    },
  },
});
