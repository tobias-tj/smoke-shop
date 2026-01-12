import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Order } from "@prisma/client";

// Estilos
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  row: { marginBottom: 5 },
  line: { borderBottomWidth: 1, borderBottomColor: "#000", marginVertical: 5 },
});

interface Props {
  orders: (Order & { user: { name: string; email: string } })[];
}

export const OrdersPdf = ({ orders }: Props) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Orders Report</Text>

      {orders.map((order) => (
        <View key={order.id} style={styles.section}>
          <Text style={styles.row}>Order ID: {order.id}</Text>
          <Text style={styles.row}>Customer: {order.user.name}</Text>
          <Text style={styles.row}>Email: {order.user.email}</Text>
          <Text style={styles.row}>Status: {order.status}</Text>
          <Text style={styles.row}>Total: ${order.totalAmount.toString()}</Text>
          <Text style={styles.row}>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.line} />
        </View>
      ))}
    </Page>
  </Document>
);
