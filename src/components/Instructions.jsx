// src/components/Instructions.jsx
export function Instructions() {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: '32px',
      borderRadius: '20px',
      marginBottom: '40px',
      color: 'white'
    }}>
      <h2 style={{ 
        fontSize: '1.75rem', 
        marginBottom: '24px',
        fontWeight: '500'
      }}>
        How to Use the ROI Calculator
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4dabf7' }}>
            1. Select Currency
          </h3>
          <p>Choose your preferred currency (€, £, or $) to display all monetary values.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4dabf7' }}>
            2. Customise Fields
          </h3>
          <p>Click 'Customise Fields' to add or modify cost and revenue fields specific to your project needs.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4dabf7' }}>
            3. Enter Values
          </h3>
          <p>Input your project costs, operational costs, and expected savings/revenue figures.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4dabf7' }}>
            4. Analysis Period
          </h3>
          <p>Set the number of months to analyse ROI and view your break-even point.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4dabf7' }}>
            5. Export Results
          </h3>
          <p>Download your analysis as a CSV file or print a detailed report.</p>
        </div>
      </div>
    </div>
  );
}