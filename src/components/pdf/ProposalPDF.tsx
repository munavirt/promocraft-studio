import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ]
});

interface ProposalPDFProps {
  leadDetails: {
    name: string;
    company: string;
    email: string;
  };
  result: {
    totalCostFormatted: string;
    time: string;
    recommended: string;
    breakdown: { label: string; cost: number; costFormatted?: string; isIncluded?: boolean }[];
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  coverPage: {
    padding: 50,
    fontFamily: 'Roboto',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 80,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 60,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 5,
  },
  metaValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: 6,
  },
  rowLabel: {
    fontSize: 12,
    color: '#475569',
  },
  rowValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '2px solid #cbd5e1',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  featureItem: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalPage: {
    padding: 50,
    backgroundColor: '#2563eb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
  },
  finalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  finalText: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default function ProposalPDF({ leadDetails, result }: ProposalPDFProps) {
  const date = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const projectType = result.breakdown.length > 0 ? result.breakdown[0].label : 'Custom Web Project';

  return (
    <Document>
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.logo}>PromoCraft</Text>
        <Text style={styles.coverTitle}>Project Cost Estimate</Text>
        <Text style={styles.coverSubtitle}>Configuration & Proposal</Text>

        <View style={{ marginTop: 40 }}>
          <Text style={styles.metaText}>Prepared for:</Text>
          <Text style={styles.metaValue}>{leadDetails.name || 'Valued Client'}</Text>
          {leadDetails.company && <Text style={styles.metaValue}>{leadDetails.company}</Text>}
          
          <Text style={[styles.metaText, { marginTop: 20 }]}>Generated on:</Text>
          <Text style={styles.metaValue}>{date}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Summary</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Project Type</Text>
            <Text style={styles.rowValue}>{projectType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estimated Timeline</Text>
            <Text style={styles.rowValue}>{result.time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estimated Investment</Text>
            <Text style={styles.rowValue}>{result.totalCostFormatted}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Recommended Package</Text>
            <Text style={styles.rowValue}>{result.recommended}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          {result.breakdown.map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowValue}>{item.costFormatted}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>{result.totalCostFormatted}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <Text style={styles.featureItem}>• Responsive & Mobile-First Design</Text>
          <Text style={styles.featureItem}>• Performance Optimization</Text>
          <Text style={styles.featureItem}>• Modern UI/UX Best Practices</Text>
          <Text style={styles.featureItem}>• Cross Browser Support</Text>
          <Text style={styles.featureItem}>• Basic Security Implementation</Text>
          <Text style={styles.featureItem}>• 30 Days Post-Launch Support</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.finalPage}>
        <Text style={styles.finalTitle}>Let's Build Something Extraordinary.</Text>
        <Text style={styles.finalText}>PromoCraft Studio</Text>
        <Text style={styles.finalText}>www.promocraft.in</Text>
        <Text style={styles.finalText}>hello@promocraft.in</Text>
      </Page>
    </Document>
  );
}
