import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const PDFDocument = ({ students }) => {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>
            List Pengguna Akademi Marica {date} {time}
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nama</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Nomor Telpon</Text>
          </View>
          {students ? (
            students.map((item) => (
              <View style={styles.row} key={item.id}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.email}</Text>
                <Text style={styles.cell}>
                  {item.phone_number ? item.phone_number : "Belum menambahkan"}
                </Text>
              </View>
            ))
          ) : (
            <Text>Tidak ada data</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 24,
    marginBottom: 0,
  },
  headerCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    height: 24,
    fontSize: 11,
    marginBottom: 0,
  },
  cell: {
    flex: 1,
    fontSize: 11,
    paddingVertical: 4,
  },
});

export default PDFDocument;
