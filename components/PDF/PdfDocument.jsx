import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { timeAndDate } from '../../helpers';
import { SVGImage } from './SvgImage';

const reusableStyle = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 35,
    paddingRight: 35,
  },
  defaultFontSize: {
    fontSize: '16px',
  },
});

// Create styles
const styles = StyleSheet.create({
  header: {
    ...reusableStyle.flex,
    ...reusableStyle.padding,
  },
  title: {
    marginTop: -18,
    fontSize: '18px',
  },
  dateTime: {
    fontSize: '12px',
    marginTop: 6,
  },
  content: {
    ...reusableStyle.flex,
    ...reusableStyle.padding,
    justifyContent: 'space-between',
  },
  contentTitle: {
    ...reusableStyle.defaultFontSize,
  },
  contentValue: {
    ...reusableStyle.defaultFontSize,
  },
});

const PDFDocument = ({ data }) => {
  const { dateTime } = timeAndDate();

  return (
    <Document>
      <Page>
        <View style={styles.header}>
          <SVGImage />
          <View>
            <Text style={styles.title}>STATISTICS OF REGISTERED USER</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
          </View>
        </View>
        {data.map(({ content, value }) => (
          <View style={styles.content} key={content}>
            <Text style={styles.contentTitle}>{content}</Text>
            <Text style={styles.contentValue}>{value}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PDFDocument;
