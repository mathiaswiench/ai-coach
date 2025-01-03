import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import formatSeconds from '@/utils/formatSeconds';

interface TrainingPlanProps {
    data: Array<{
        week: number;
        training: Array<{
            day: string;
            activity: string;
        }>;
    }>;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        orientation: 'landscape',
    },
    table: {
        display: 'flex',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        fontSize: 12,
        flexWrap: 'nowrap',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        breakInside: 'avoid',
        width: '100%',
    },
    tableCell: {
        width: '12.5%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    headerCell: {
        width: '12.5%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        backgroundColor: '#f0f0f0',
    }
});

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PDFTrainingPlan: React.FC<TrainingPlanProps> = ({ data }) => (
    <Document>
        <Page size="A4" orientation='landscape' style={styles.page} wrap={false}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.headerCell}>
                        <Text>Week</Text>
                    </View>
                    {weekDays.map((day) => (
                        <View key={day} style={styles.headerCell}>
                            <Text>{day}</Text>
                        </View>
                    ))}
                </View>

                {data.map((week) => (
                    <View key={week.week} style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>{week.week}</Text>
                        </View>
                        {weekDays.map((day) => {
                            const trainingForDay = week.training.find(
                                (training) => training.day === day
                            );

                            return (
                                <View key={day} style={styles.tableCell}>

                                    {trainingForDay &&
                                        (trainingForDay.activity !== "REST" ?
                                            < View >
                                                <Text>{trainingForDay.length} km</Text>
                                                <Text>{formatSeconds(trainingForDay.targetAvgPace)} min/s</Text>
                                                {trainingForDay.activity === "INTERVAL_RUN" ? <Text>{trainingForDay.interval.reptitions} x {trainingForDay.interval.length} km @ {formatSeconds(trainingForDay.interval.targetPace)} with {formatSeconds(trainingForDay.interval.restBetweenRounds)} rest.</Text> : null}

                                            </View>

                                            : "")}

                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </Page>
    </Document >
);

export default PDFTrainingPlan;