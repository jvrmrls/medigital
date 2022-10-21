import {
  Page,
  Image,
  Document,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import JsBarcode from 'jsbarcode'
import moment from 'moment/moment'

const styles = StyleSheet.create({
  section: {
    textAlign: 'center',
    margin: 30,
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  smallText: {
    fontSize: 12,
  },
})

const DatePdfComponent = ({ data }) => {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, data._id)
  const barcode = canvas.toDataURL()

  return (
    <>
      <Document>
        <Page size='A4'>
          <View style={styles.section}>
            <Text style={styles.title}>medigital - cita m&eacute;dica</Text>
            <Text>Fecha: {moment(data.date).format('ll')}</Text>
            <Text>Hora: {data.hour}</Text>
            <Text style={styles.smallText}>Paciente: {data.name}</Text>
            <Text style={styles.smallText}>Motivo: {data.reason}</Text>
            <Image
              style={{ maxWidth: '50%', margin: '0 auto' }}
              src={barcode}
            />
          </View>
        </Page>
      </Document>
    </>
  )
}

export default DatePdfComponent
