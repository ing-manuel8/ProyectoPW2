import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20
    },
    clinicInfo: {
        marginBottom: 20,
        fontSize: 12,
        textAlign: 'center'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        fontSize: 12
    },
    label: {
        width: 150,
        fontWeight: 'bold'
    },
    value: {
        flex: 1
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: 'grey'
    }
});

const CitaPDF = ({ cita }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Comprobante de Cita Médica</Text>
            
            <Text style={styles.clinicInfo}>
                Clínica Médica{'\n'}
                Dirección: Av. Principal #123{'\n'}
                Tel: (123) 456-7890
            </Text>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Paciente:</Text>
                    <Text style={styles.value}>{cita.patient?.username || cita.patientName}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Doctor:</Text>
                    <Text style={styles.value}>{cita.doctor?.username || 'No asignado'}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Departamento:</Text>
                    <Text style={styles.value}>{cita.department}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>
                        {new Date(cita.date).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Hora:</Text>
                    <Text style={styles.value}>{cita.time}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tipo de Consulta:</Text>
                    <Text style={styles.value}>{cita.consultationType}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Duración:</Text>
                    <Text style={styles.value}>{cita.duration} minutos</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Estado:</Text>
                    <Text style={styles.value}>{cita.status}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Razón de Consulta:</Text>
                    <Text style={styles.value}>{cita.reason}</Text>
                </View>

                {cita.notes && (
                    <View style={styles.row}>
                        <Text style={styles.label}>Notas:</Text>
                        <Text style={styles.value}>{cita.notes}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.footer}>
                Este documento es un comprobante de su cita médica.{'\n'}
                Por favor, preséntelo al momento de su consulta.
            </Text>
        </Page>
    </Document>
);

export default CitaPDF;