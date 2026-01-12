import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { OrderWithDetails } from "../types";

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 100, height: 50 },
  title: { fontSize: 18, fontWeight: "bold" },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000", marginBottom: 5, paddingBottom: 3 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  bold: { fontWeight: "bold" },
  footer: { marginTop: 20, textAlign: "right", fontSize: 14, fontWeight: "bold" },
});

interface Props {
  order: OrderWithDetails;
}

export const OrderReceiptPdf = ({ order }: Props) => (
  <Document>
    <Page style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.title}>Receipt / Invoice</Text>
      </View>

      {/* CUSTOMER INFO */}
      <View style={styles.section}>
        <Text style={styles.bold}>Customer:</Text>
        <Text>{order.user.name}</Text>
        <Text>{order.user.email}</Text>
      </View>

      {/* ORDER DETAILS */}
      <View style={styles.section}>
        <Text style={styles.bold}>Order ID: {order.id}</Text>
        <Text>Status: {order.status}</Text>
        <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={{ width: "40%" }}>Product</Text>
        <Text style={{ width: "15%", textAlign: "right" }}>Qty</Text>
        <Text style={{ width: "20%", textAlign: "right" }}>Unit</Text>
        <Text style={{ width: "25%", textAlign: "right" }}>Total</Text>
      </View>

      {/* TABLE ROWS */}
      {order.items.map((p) => {
        const quantity = Number(p.quantity ?? 0);
        const unitPrice = Number(p.unitPrice ?? p.product?.price ?? 0);
        const total = quantity * unitPrice;


        return (
            <View key={p.id} style={styles.tableRow}>
            <Text style={{ width: "40%" }}>{p.product.name}</Text>
            <Text style={{ width: "15%", textAlign: "right" }}>{quantity}</Text>
            <Text style={{ width: "20%", textAlign: "right" }}>${unitPrice.toFixed(2)}</Text>
            <Text style={{ width: "25%", textAlign: "right" }}>${total.toFixed(2)}</Text>

            </View>
        );
      })}

      {/* TOTAL */}
      <Text style={styles.footer}>TOTAL: ${Number(order.totalAmount ?? 0).toFixed(2)}</Text>
    </Page>
  </Document>
);
