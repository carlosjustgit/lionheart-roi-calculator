// src/components/Calculator.jsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function Calculator() {
  const [currency, setCurrency] = useState('€');
  const [fields, setFields] = useState([
    { id: 1, name: 'projectCost', label: 'Initial Project Cost', value: 20000, type: 'cost' },
    { id: 2, name: 'monthlyOperationalCost', label: 'Monthly Operational Cost', value: 5000, type: 'cost' },
    { id: 3, name: 'currentMonthlyCost', label: 'Current Monthly Cost', value: 3000, type: 'cost' },
    { id: 4, name: 'projectedMonthlySavings', label: 'Additional Monthly Savings/Revenue', value: 3000, type: 'revenue' },
    { id: 5, name: 'monthsToAnalyze', label: 'Months to Analyse', value: 32, type: 'other' }
  ]);

  const [showFieldEditor, setShowFieldEditor] = useState(false);
  const [newField, setNewField] = useState({
    label: '',
    value: 0,
    type: 'cost'
  });

  // Add field handling functions
  const addField = () => {
    if (newField.label) {
      setFields([...fields, {
        id: fields.length + 1,
        name: newField.label.toLowerCase().replace(/\s+/g, '_'),
        label: newField.label,
        value: Number(newField.value),
        type: newField.type
      }]);
      setNewField({ label: '', value: 0, type: 'cost' });
    }
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id, value) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value: Number(value) } : field
    ));
  };

  // ROI Calculations
  const calculateROIData = () => {
    const data = [];
    const monthsToAnalyze = fields.find(f => f.name === 'monthsToAnalyze')?.value || 24;
    let cumulativeCost = fields.find(f => f.name === 'projectCost')?.value || 0;
    let cumulativeSavings = 0;

    for (let month = 0; month <= monthsToAnalyze; month++) {
      if (month > 0) {
        // Add monthly costs
        const monthlyCosts = fields
          .filter(f => f.type === 'cost' && f.name.includes('monthly'))
          .reduce((sum, field) => sum + field.value, 0);
        cumulativeCost += monthlyCosts;

        // Add monthly savings/revenue
        const monthlySavings = fields
          .filter(f => f.type === 'revenue' || f.name === 'currentMonthlyCost')
          .reduce((sum, field) => sum + field.value, 0);
        cumulativeSavings += monthlySavings;
      }

      const netROI = cumulativeSavings - cumulativeCost;

      data.push({
        month,
        costs: -cumulativeCost,
        revenue: cumulativeSavings,
        netROI
      });
    }
    return data;
  };

  const roiData = calculateROIData();
  const breakEvenMonth = roiData.find(point => point.netROI >= 0)?.month || 'N/A';

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency === '€' ? 'EUR' : currency === '£' ? 'GBP' : 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Export function
  const exportData = () => {
    const csvContent = "Month,Costs,Revenue,Net ROI\n" +
      roiData.map(row => `${row.month},${row.costs},${row.revenue},${row.netROI}`).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'lionheart-roi-analysis.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    }}>
      {/* Currency Selector */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <label style={{ 
          fontWeight: '500',
          color: '#1a1a1a'
        }}>
          Select Currency:
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #e1e1e1',
            backgroundColor: '#f8fafc'
          }}
        >
          <option value="€">Euro (€)</option>
          <option value="£">British Pound (£)</option>
          <option value="$">US Dollar ($)</option>
        </select>
      </div>

      {/* Field Editor Button */}
      <button
        onClick={() => setShowFieldEditor(!showFieldEditor)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#0033cc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        {showFieldEditor ? 'Hide Field Editor' : 'Customise Fields'}
      </button>

      {/* Field Editor */}
      {showFieldEditor && (
        <div style={{
          marginBottom: '20px',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e1e1e1'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Add New Field</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Field Label"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e1e1e1'
              }}
            />
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e1e1e1'
              }}
            >
              <option value="cost">Cost</option>
              <option value="revenue">Revenue</option>
              <option value="other">Other</option>
            </select>
            <button
              onClick={addField}
              style={{
                padding: '8px 16px',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Field
            </button>
          </div>
        </div>
      )}

      {/* Main Calculator Content */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'start'
      }}>
        {/* Input Fields */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px',
          minWidth: '300px'
        }}>
          {fields.map(field => (
            <div key={field.id}>
              <label style={{ 
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#1a1a1a',
                fontSize: '0.9rem'
              }}>
                {field.label} {field.type !== 'other' ? `(${currency})` : ''}
              </label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e1e1e1',
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>
          ))}

          {/* Results Box */}
          <div style={{ 
            padding: '24px',
            backgroundColor: 'rgba(0,51,204,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(0,51,204,0.1)'
          }}>
            <h3 style={{ 
              color: '#0033cc',
              fontWeight: '500',
              marginBottom: '16px',
              fontSize: '1.1rem'
            }}>
              ROI Analysis Results
            </h3>
            <p style={{ marginBottom: '12px' }}>
              Break-even Point: {breakEvenMonth} months
            </p>
            <p>
              Total ROI: {formatCurrency(roiData[roiData.length - 1].netROI)}
            </p>
          </div>

          {/* Export Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            <button
              onClick={exportData}
              style={{
                padding: '12px 24px',
                backgroundColor: '#0033cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Export Data (CSV)
            </button>
            <button
              onClick={() => window.print()}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#0033cc',
                border: '2px solid #0033cc',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Graph */}
        <div style={{ 
          backgroundColor: '#f8fafc',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #e1e1e1',
          height: 'fit-content'
        }}>
          <LineChart 
            width={500} 
            height={400} 
            data={roiData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e1e1" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Months', position: 'bottom', offset: -10 }}
              stroke="#666"
            />
            <YAxis 
              label={{ 
                value: `Amount (${currency})`, 
                angle: -90, 
                position: 'left',
                offset: -10
              }}
              stroke="#666"
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
            <Line type="monotone" dataKey="costs" stroke="#dc2626" name="Cumulative Costs" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#16a34a" name="Cumulative Revenue" strokeWidth={2} />
            <Line type="monotone" dataKey="netROI" stroke="#0033cc" name="Net ROI" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}