<?php
$conn = new mysqli("localhost", "root", "", "crud_vue");

if($conn->connect_error){
    die("Koneksi Gagal">$conn->connect_error);


}

$result = array('error'=>false);
$action ="";


if(isset($_GET['action'])){
    $action = $_GET['action'];

}


//read data
if($action == "read"){
    $sql = $conn->query("SELECT * FROM barang");
    $barang = array();

    while($row = $sql->fetch_assoc()){
        array_push($barang, $row);

    }
    $result['barang'] = $barang;
}

//create data
if($action == "create"){
    $nama = $_POST['nama'];
    $stok = $_POST['stok'];
    $keterangan = $_POST['keterangan'];

    $sql = $conn->query("INSERT INTO barang(nama,stok,keterangan) VALUES ('$nama','$stok','$keterangan')");
    
    if($sql){
        $result['message'] = "Data Barang Berhasil Ditambahkan";

    }else{
        $result['error'] = true;
        $result['message'] = "Data Barang Gagal Ditambahkan";
    }
}

//update data
if($action == "update"){
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $stok = $_POST['stok'];
    $keterangan = $_POST['keterangan'];

    $sql = $conn->query("UPDATE barang SET nama='$nama', stok='$stok', keterangan='$keterangan' WHERE id='$id'");
    
    if($sql){
        $result['message'] = "Data Barang Berhasil Dirubah";

    }else{
        $result['error'] = true;
        $result['message'] = "Data Barang Gagal Dirubah";
    }
}

//delete data
if($action == "delete"){
    $id = $_POST['id'];

    $sql = $conn->query("DELETE FROM barang WHERE id='$id'");
    
    if($sql){
        $result['message'] = "Data Barang Berhasil Dihapus";

    }else{
        $result['error'] = true;
        $result['message'] = "Data Barang Gagal Dihapus";
    }
}

    $conn->close();
    echo(json_encode($result));
?>