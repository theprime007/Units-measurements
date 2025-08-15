// Phase 6: Advanced Export and Integration System
// Provides comprehensive data export capabilities and third-party integrations

class ExportIntegrationSystem {
  constructor() {
    // Prevent duplicate initialization
    if (ExportIntegrationSystem.instance) {
      return ExportIntegrationSystem.instance;
    }
    
    this.exportFormats = ['pdf', 'csv', 'json', 'excel'];
    this.integrations = {
      googleSheets: false,
      oneDrive: false,
      dropbox: false,
      email: true
    };
    
    this.init();
    ExportIntegrationSystem.instance = this;
  }
  
  init() {
    this.setupExportUI();
    this.setupIntegrationHandlers();
    console.log('Export Integration System initialized');
  }
  
  // Setup export UI components
  setupExportUI() {
    const exportHTML = `
      <div class="export-integration-panel glass-panel">
        <div class="export-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Export & Share Results
          </h3>
          <p>Export your test results and performance data</p>
        </div>
        
        <div class="export-options">
          <div class="export-section">
            <h4>📄 Export Formats</h4>
            <div class="export-formats">
              <button class="export-btn" data-format="pdf">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span>PDF Report</span>
                <small>Detailed performance report</small>
              </button>
              
              <button class="export-btn" data-format="csv">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span>CSV Data</span>
                <small>Question-wise analysis</small>
              </button>
              
              <button class="export-btn" data-format="excel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span>Excel Sheet</span>
                <small>Spreadsheet with charts</small>
              </button>
              
              <button class="export-btn" data-format="json">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,3H7V5H5V10A2,2 0 0,1 3,8H1V6H3A2,2 0 0,1 5,8V3M19,3V8A2,2 0 0,1 21,6H23V8H21A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z"/>
                </svg>
                <span>JSON Data</span>
                <small>Raw data for developers</small>
              </button>
            </div>
          </div>
          
          <div class="export-section">
            <h4>☁️ Cloud Integration</h4>
            <div class="integration-options">
              <button class="integration-btn" data-integration="googleSheets">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.5,1C5.159,1 0,6.159 0,12.5S5.159,24 11.5,24S23,18.841 23,12.5S17.841,1 11.5,1z M18.5,16.5h-14v-8.5h14V16.5z"/>
                </svg>
                <span>Google Sheets</span>
                <small>Save to spreadsheet</small>
              </button>
              
              <button class="integration-btn" data-integration="oneDrive">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.71,10.33C7.93,8.48 9.58,7 11.5,7A4.5,4.5 0 0,1 16,11.5V12H16.5A2.5,2.5 0 0,1 19,14.5A2.5,2.5 0 0,1 16.5,17H7.5A3.5,3.5 0 0,1 4,13.5C4,11.57 5.57,10 7.5,10H7.71Z"/>
                </svg>
                <span>OneDrive</span>
                <small>Microsoft cloud storage</small>
              </button>
              
              <button class="integration-btn" data-integration="email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
                <span>Email Report</span>
                <small>Send results via email</small>
              </button>
            </div>
          </div>
          
          <div class="export-section">
            <h4>🔗 Quick Share</h4>
            <div class="quick-share">
              <button class="share-quick-btn" data-action="copy-results">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                </svg>
                Copy Summary
              </button>
              
              <button class="share-quick-btn" data-action="generate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/>
                </svg>
                Share Link
              </button>
              
              <button class="share-quick-btn" data-action="print-results">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"/>
                </svg>
                Print Report
              </button>
            </div>
          </div>
        </div>
        
        <div class="export-progress" id="export-progress" style="display: none;">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="progress-text">Preparing export...</span>
        </div>
      </div>
    `;
    
    this.exportHTML = exportHTML;
  }
  
  // Setup integration event handlers
  setupIntegrationHandlers() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.export-btn')) {
        const btn = e.target.closest('.export-btn');
        const format = btn.dataset.format;
        this.exportData(format);
      }
      
      if (e.target.closest('.integration-btn')) {
        const btn = e.target.closest('.integration-btn');
        const integration = btn.dataset.integration;
        this.integrateWith(integration);
      }
      
      if (e.target.closest('.share-quick-btn')) {
        const btn = e.target.closest('.share-quick-btn');
        const action = btn.dataset.action;
        this.quickShare(action);
      }
    });
  }
  
  // Export data in specified format
  async exportData(format) {
    this.showProgress('Preparing export...');
    
    try {
      const results = this.gatherExportData();
      
      switch (format) {
        case 'pdf':
          await this.exportToPDF(results);
          break;
        case 'csv':
          this.exportToCSV(results);
          break;
        case 'excel':
          await this.exportToExcel(results);
          break;
        case 'json':
          this.exportToJSON(results);
          break;
      }
      
      this.hideProgress();
      this.showToast(`Successfully exported to ${format.toUpperCase()}`, 'success');
    } catch (error) {
      console.error('Export error:', error);
      this.hideProgress();
      this.showToast('Export failed. Please try again.', 'error');
    }
  }
  
  // Gather comprehensive export data
  gatherExportData() {
    const state = window.app?.stateManager?.getState() || {};
    const results = window.app?.stateManager?.getResults() || {};
    const performance = window.app?.performanceAnalytics?.getAnalyticsData() || {};
    const social = window.app?.socialFeatures?.userProfile || {};
    
    return {
      testInfo: {
        testName: 'Units & Measurements Mock Test',
        date: new Date().toISOString(),
        duration: this.formatTime(state.totalTime || 0),
        questionsTotal: 50,
        questionsAttempted: Object.keys(state.answers || {}).length
      },
      performance: {
        score: results.score || 0,
        percentage: results.percentage || 0,
        correct: results.correctAnswers || 0,
        incorrect: results.incorrectAnswers || 0,
        unanswered: results.unansweredQuestions || 0,
        averageTime: results.averageTime || 0
      },
      analytics: performance,
      social: {
        totalPoints: social.totalPoints || 0,
        rank: social.rank || 0,
        achievements: social.achievements || [],
        testsCompleted: social.testsCompleted || 0
      },
      questionDetails: this.getQuestionDetails(state),
      recommendations: this.getRecommendations()
    };
  }
  
  // Get detailed question analysis
  getQuestionDetails(state) {
    const questions = window.app?.getCurrentQuestions() || [];
    const answers = state.answers || {};
    const timeSpent = state.timeSpent || {};
    
    return questions.map((question, index) => ({
      questionNumber: index + 1,
      question: question.question,
      options: question.options,
      correctAnswer: question.options[question.correctIndex],
      userAnswer: answers[index + 1] !== undefined ? question.options[answers[index + 1]] : 'Not Answered',
      isCorrect: answers[index + 1] === question.correctIndex,
      timeSpent: this.formatTime(timeSpent[index + 1] || 0),
      topic: question.topic || 'General',
      difficulty: question.difficulty || 'Medium'
    }));
  }
  
  // Get AI recommendations
  getRecommendations() {
    return [
      'Focus more on dimensional analysis problems',
      'Practice time management for better speed',
      'Review fundamental SI units and conversions',
      'Attempt more practice tests for consistency'
    ];
  }
  
  // Export to PDF
  async exportToPDF(data) {
    // Create a comprehensive PDF report
    const content = this.generatePDFContent(data);
    const element = document.createElement('div');
    element.innerHTML = content;
    element.style.cssText = 'position: absolute; left: -9999px; padding: 20px; font-family: Arial, sans-serif;';
    document.body.appendChild(element);
    
    // Use html2pdf if available, otherwise show print dialog
    if (window.html2pdf) {
      const opt = {
        margin: 1,
        filename: `Units_Measurements_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await window.html2pdf().set(opt).from(element).save();
    } else {
      // Fallback to print dialog
      window.print();
    }
    
    document.body.removeChild(element);
  }
  
  // Generate PDF content
  generatePDFContent(data) {
    return `
      <div style="max-width: 800px; margin: 0 auto;">
        <h1 style="color: #1FB8CD; text-align: center; margin-bottom: 30px;">
          Units & Measurements Test Report
        </h1>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2>Test Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>Date:</strong></td><td>${new Date(data.testInfo.date).toLocaleDateString()}</td></tr>
            <tr><td><strong>Duration:</strong></td><td>${data.testInfo.duration}</td></tr>
            <tr><td><strong>Score:</strong></td><td>${data.performance.score}/${data.testInfo.questionsTotal} (${data.performance.percentage}%)</td></tr>
            <tr><td><strong>Correct Answers:</strong></td><td>${data.performance.correct}</td></tr>
            <tr><td><strong>Incorrect Answers:</strong></td><td>${data.performance.incorrect}</td></tr>
            <tr><td><strong>Unanswered:</strong></td><td>${data.performance.unanswered}</td></tr>
          </table>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2>Question-wise Analysis</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
            <thead>
              <tr style="background: #1FB8CD; color: white;">
                <th style="padding: 10px; border: 1px solid #ddd;">Q#</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Time</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Topic</th>
              </tr>
            </thead>
            <tbody>
              ${data.questionDetails.map(q => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${q.questionNumber}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; color: ${q.isCorrect ? 'green' : q.userAnswer === 'Not Answered' ? 'orange' : 'red'};">
                    ${q.isCorrect ? '✓ Correct' : q.userAnswer === 'Not Answered' ? '- Skipped' : '✗ Incorrect'}
                  </td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${q.timeSpent}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${q.topic}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div>
          <h2>Recommendations</h2>
          <ul>
            ${data.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
  
  // Export to CSV
  exportToCSV(data) {
    const csvContent = this.generateCSVContent(data);
    this.downloadFile(csvContent, `Units_Measurements_Results_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
  }
  
  // Generate CSV content
  generateCSVContent(data) {
    const headers = [
      'Question Number', 'Question', 'Correct Answer', 'User Answer', 
      'Status', 'Time Spent', 'Topic', 'Difficulty'
    ];
    
    const rows = data.questionDetails.map(q => [
      q.questionNumber,
      `"${q.question.replace(/"/g, '""')}"`,
      `"${q.correctAnswer}"`,
      `"${q.userAnswer}"`,
      q.isCorrect ? 'Correct' : q.userAnswer === 'Not Answered' ? 'Skipped' : 'Incorrect',
      q.timeSpent,
      q.topic,
      q.difficulty
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
  
  // Export to Excel (XLSX format)
  async exportToExcel(data) {
    // Create workbook structure
    const workbook = {
      SheetNames: ['Summary', 'Question Analysis'],
      Sheets: {
        'Summary': this.createSummarySheet(data),
        'Question Analysis': this.createAnalysisSheet(data)
      }
    };
    
    // Convert to Excel file and download
    const excelContent = this.generateExcelContent(workbook);
    this.downloadFile(excelContent, `Units_Measurements_Report_${new Date().toISOString().split('T')[0]}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }
  
  // Create summary sheet for Excel
  createSummarySheet(data) {
    return {
      A1: { v: 'Test Summary', t: 's' },
      A3: { v: 'Metric', t: 's' },
      B3: { v: 'Value', t: 's' },
      A4: { v: 'Date', t: 's' },
      B4: { v: new Date(data.testInfo.date).toLocaleDateString(), t: 's' },
      A5: { v: 'Score', t: 's' },
      B5: { v: `${data.performance.score}/${data.testInfo.questionsTotal}`, t: 's' },
      A6: { v: 'Percentage', t: 's' },
      B6: { v: `${data.performance.percentage}%`, t: 's' },
      A7: { v: 'Duration', t: 's' },
      B7: { v: data.testInfo.duration, t: 's' },
      '!ref': 'A1:B7'
    };
  }
  
  // Create analysis sheet for Excel
  createAnalysisSheet(data) {
    const sheet = {};
    const headers = ['Q#', 'Status', 'Time', 'Topic', 'Correct Answer', 'User Answer'];
    
    // Add headers
    headers.forEach((header, index) => {
      const col = String.fromCharCode(65 + index);
      sheet[`${col}1`] = { v: header, t: 's' };
    });
    
    // Add data rows
    data.questionDetails.forEach((q, rowIndex) => {
      const row = rowIndex + 2;
      sheet[`A${row}`] = { v: q.questionNumber, t: 'n' };
      sheet[`B${row}`] = { v: q.isCorrect ? 'Correct' : q.userAnswer === 'Not Answered' ? 'Skipped' : 'Incorrect', t: 's' };
      sheet[`C${row}`] = { v: q.timeSpent, t: 's' };
      sheet[`D${row}`] = { v: q.topic, t: 's' };
      sheet[`E${row}`] = { v: q.correctAnswer, t: 's' };
      sheet[`F${row}`] = { v: q.userAnswer, t: 's' };
    });
    
    sheet['!ref'] = `A1:F${data.questionDetails.length + 1}`;
    return sheet;
  }
  
  // Export to JSON
  exportToJSON(data) {
    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, `Units_Measurements_Data_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  }
  
  // Cloud integration handlers
  async integrateWith(integration) {
    this.showProgress(`Connecting to ${integration}...`);
    
    try {
      switch (integration) {
        case 'googleSheets':
          await this.saveToGoogleSheets();
          break;
        case 'oneDrive':
          await this.saveToOneDrive();
          break;
        case 'email':
          this.sendEmail();
          break;
        default:
          throw new Error('Integration not implemented');
      }
      
      this.hideProgress();
      this.showToast(`Successfully connected to ${integration}`, 'success');
    } catch (error) {
      console.error('Integration error:', error);
      this.hideProgress();
      this.showToast(`Failed to connect to ${integration}`, 'error');
    }
  }
  
  // Save to Google Sheets (mock implementation)
  async saveToGoogleSheets() {
    // In a real implementation, this would use Google Sheets API
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showToast('Google Sheets integration coming soon!', 'info');
        resolve();
      }, 2000);
    });
  }
  
  // Save to OneDrive (mock implementation)
  async saveToOneDrive() {
    // In a real implementation, this would use Microsoft Graph API
    return new Promise((resolve) => {
      setTimeout(() => {
        this.showToast('OneDrive integration coming soon!', 'info');
        resolve();
      }, 2000);
    });
  }
  
  // Send email with results
  sendEmail() {
    const data = this.gatherExportData();
    const subject = encodeURIComponent('Units & Measurements Test Results');
    const body = encodeURIComponent(`
      Test Results Summary:
      
      Date: ${new Date(data.testInfo.date).toLocaleDateString()}
      Score: ${data.performance.score}/${data.testInfo.questionsTotal} (${data.performance.percentage}%)
      Duration: ${data.testInfo.duration}
      
      Correct Answers: ${data.performance.correct}
      Incorrect Answers: ${data.performance.incorrect}
      Unanswered: ${data.performance.unanswered}
      
      Generated by Units & Measurements Mock Test Platform
    `);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }
  
  // Quick share actions
  quickShare(action) {
    const data = this.gatherExportData();
    
    switch (action) {
      case 'copy-results':
        this.copyResultsToClipboard(data);
        break;
      case 'generate-link':
        this.generateShareableLink(data);
        break;
      case 'print-results':
        this.printResults(data);
        break;
    }
  }
  
  // Copy results summary to clipboard
  async copyResultsToClipboard(data) {
    const summary = `
Units & Measurements Test Results

📊 Score: ${data.performance.score}/${data.testInfo.questionsTotal} (${data.performance.percentage}%)
⏱️ Duration: ${data.testInfo.duration}
✅ Correct: ${data.performance.correct}
❌ Incorrect: ${data.performance.incorrect}
⭕ Unanswered: ${data.performance.unanswered}

Date: ${new Date(data.testInfo.date).toLocaleDateString()}
    `.trim();
    
    try {
      await navigator.clipboard.writeText(summary);
      this.showToast('Results copied to clipboard!', 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      this.showToast('Failed to copy results', 'error');
    }
  }
  
  // Generate shareable link
  generateShareableLink(data) {
    // In a real app, this would generate a unique shareable link
    const shareData = {
      score: data.performance.percentage,
      total: data.testInfo.questionsTotal,
      date: data.testInfo.date
    };
    
    const encodedData = btoa(JSON.stringify(shareData));
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      this.showToast('Shareable link copied to clipboard!', 'success');
    }).catch(() => {
      this.showToast('Failed to copy link', 'error');
    });
  }
  
  // Print results
  printResults(data) {
    const printContent = this.generatePDFContent(data);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Units & Measurements Test Results</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1FB8CD; color: white; }
            .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
  
  // Utility methods
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  showProgress(message) {
    const progress = document.getElementById('export-progress');
    if (progress) {
      progress.style.display = 'block';
      const text = progress.querySelector('.progress-text');
      if (text) text.textContent = message;
    }
  }
  
  hideProgress() {
    const progress = document.getElementById('export-progress');
    if (progress) {
      progress.style.display = 'none';
    }
  }
  
  showToast(message, type = 'info') {
    if (window.Utils && window.Utils.showToast) {
      window.Utils.showToast(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }
  
  // Get export UI HTML
  getExportHTML() {
    return this.exportHTML;
  }
}

// Export for global access
window.ExportIntegrationSystem = ExportIntegrationSystem;