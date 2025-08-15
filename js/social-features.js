// Phase 6: Advanced Social Features
// Global leaderboards, social sharing, and collaborative learning platform

class SocialFeatures {
  constructor() {
    // Prevent duplicate initialization
    if (SocialFeatures.instance) {
      return SocialFeatures.instance;
    }
    
    this.leaderboard = [];
    this.userProfile = {
      username: '',
      avatar: null,
      achievements: [],
      totalPoints: 0,
      rank: 0,
      streakDays: 0,
      testsCompleted: 0
    };
    this.achievements = [];
    this.socialSettings = {
      shareEnabled: true,
      leaderboardVisible: true,
      showRealName: false,
      allowCollaboration: true
    };
    
    this.init();
    SocialFeatures.instance = this;
  }
  
  init() {
    this.loadUserProfile();
    this.loadAchievements();
    this.setupSocialUI();
    this.initializeLeaderboard();
    console.log('Social Features System initialized');
  }
  
  // Load user profile from storage
  loadUserProfile() {
    try {
      const saved = localStorage.getItem('socialUserProfile');
      if (saved) {
        this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
      }
      
      const settings = localStorage.getItem('socialSettings');
      if (settings) {
        this.socialSettings = { ...this.socialSettings, ...JSON.parse(settings) };
      }
    } catch (error) {
      console.warn('Failed to load user profile:', error);
    }
  }
  
  // Save user profile
  saveUserProfile() {
    try {
      localStorage.setItem('socialUserProfile', JSON.stringify(this.userProfile));
      localStorage.setItem('socialSettings', JSON.stringify(this.socialSettings));
    } catch (error) {
      console.warn('Failed to save user profile:', error);
    }
  }
  
  // Initialize achievement system
  loadAchievements() {
    this.achievements = [
      {
        id: 'first_test',
        name: 'First Steps',
        description: 'Complete your first mock test',
        icon: '🎯',
        points: 50,
        unlocked: false
      },
      {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Achieve 100% accuracy in a test',
        icon: '⭐',
        points: 200,
        unlocked: false
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete a test in under 30 minutes',
        icon: '⚡',
        points: 150,
        unlocked: false
      },
      {
        id: 'consistent_learner',
        name: 'Consistent Learner',
        description: 'Complete tests for 7 consecutive days',
        icon: '🔥',
        points: 300,
        unlocked: false
      },
      {
        id: 'knowledge_master',
        name: 'Knowledge Master',
        description: 'Complete 50 mock tests',
        icon: '🏆',
        points: 500,
        unlocked: false
      },
      {
        id: 'improvement_champion',
        name: 'Improvement Champion',
        description: 'Improve score by 20% over 5 tests',
        icon: '📈',
        points: 250,
        unlocked: false
      }
    ];
    
    // Load unlocked achievements
    try {
      const saved = localStorage.getItem('unlockedAchievements');
      if (saved) {
        const unlocked = JSON.parse(saved);
        this.achievements.forEach(achievement => {
          if (unlocked.includes(achievement.id)) {
            achievement.unlocked = true;
          }
        });
      }
    } catch (error) {
      console.warn('Failed to load achievements:', error);
    }
  }
  
  // Setup social UI components
  setupSocialUI() {
    this.createProfileCard();
    this.createLeaderboardView();
    this.createAchievementsView();
    this.createSharingButtons();
  }
  
  // Create user profile card
  createProfileCard() {
    const profileHTML = `
      <div class="social-profile-card glass-panel">
        <div class="profile-header">
          <div class="profile-avatar">
            <div class="avatar-circle">
              ${this.userProfile.avatar || this.generateAvatar()}
            </div>
            <div class="profile-status">
              <div class="streak-indicator">
                🔥 ${this.userProfile.streakDays} day streak
              </div>
            </div>
          </div>
          <div class="profile-info">
            <h3 class="profile-name">${this.userProfile.username || 'Anonymous User'}</h3>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">${this.userProfile.totalPoints}</span>
                <span class="stat-label">Points</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">#${this.userProfile.rank || '---'}</span>
                <span class="stat-label">Rank</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">${this.userProfile.testsCompleted}</span>
                <span class="stat-label">Tests</span>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-achievements">
          <h4>Recent Achievements</h4>
          <div class="achievements-preview">
            ${this.getRecentAchievements().map(achievement => `
              <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-icon">${achievement.icon}</span>
                <span class="achievement-name">${achievement.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    // Store for later injection
    this.profileCardHTML = profileHTML;
  }
  
  // Generate avatar based on username
  generateAvatar() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    const userName = this.userProfile.username || 'User';
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const colorIndex = userName.length % colors.length;
    
    return `
      <div class="avatar-initials" style="background: ${colors[colorIndex]}">
        ${initials}
      </div>
    `;
  }
  
  // Create leaderboard view
  createLeaderboardView() {
    const leaderboardHTML = `
      <div class="leaderboard-container glass-panel">
        <div class="leaderboard-header">
          <h3>🏆 Global Leaderboard</h3>
          <div class="leaderboard-filters">
            <button class="filter-btn active" data-filter="today">Today</button>
            <button class="filter-btn" data-filter="week">This Week</button>
            <button class="filter-btn" data-filter="month">This Month</button>
            <button class="filter-btn" data-filter="all">All Time</button>
          </div>
        </div>
        <div class="leaderboard-list">
          <div class="leaderboard-item header">
            <span class="rank-col">Rank</span>
            <span class="name-col">User</span>
            <span class="score-col">Score</span>
            <span class="tests-col">Tests</span>
            <span class="points-col">Points</span>
          </div>
          <div id="leaderboard-entries">
            ${this.generateLeaderboardEntries()}
          </div>
        </div>
        <div class="leaderboard-user-position">
          <div class="user-position-card">
            <span class="position-rank">#${this.userProfile.rank || '---'}</span>
            <span class="position-name">Your Position</span>
            <span class="position-points">${this.userProfile.totalPoints} pts</span>
          </div>
        </div>
      </div>
    `;
    
    this.leaderboardHTML = leaderboardHTML;
  }
  
  // Generate mock leaderboard entries
  generateLeaderboardEntries() {
    const mockUsers = [
      { name: 'Alex Kumar', score: 98, tests: 47, points: 2450, rank: 1 },
      { name: 'Priya Singh', score: 96, tests: 52, points: 2380, rank: 2 },
      { name: 'Rajesh Sharma', score: 94, tests: 41, points: 2290, rank: 3 },
      { name: 'Anjali Patel', score: 92, tests: 38, points: 2180, rank: 4 },
      { name: 'Vikram Mehta', score: 90, tests: 45, points: 2050, rank: 5 },
      { name: 'Sneha Reddy', score: 88, tests: 33, points: 1980, rank: 6 },
      { name: 'Arjun Das', score: 86, tests: 29, points: 1890, rank: 7 },
      { name: 'Kavya Nair', score: 84, tests: 31, points: 1820, rank: 8 }
    ];
    
    return mockUsers.map((user, index) => `
      <div class="leaderboard-item ${index < 3 ? 'top-rank' : ''}">
        <span class="rank-col">
          <span class="rank-number">${user.rank}</span>
          ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
        </span>
        <span class="name-col">
          <div class="user-info">
            <div class="user-avatar small">${this.generateMockAvatar(user.name)}</div>
            <span class="user-name">${user.name}</span>
          </div>
        </span>
        <span class="score-col">${user.score}%</span>
        <span class="tests-col">${user.tests}</span>
        <span class="points-col">${user.points}</span>
      </div>
    `).join('');
  }
  
  // Generate mock avatar for leaderboard users
  generateMockAvatar(name) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colorIndex = name.length % colors.length;
    
    return `<div class="avatar-initials" style="background: ${colors[colorIndex]}">${initials}</div>`;
  }
  
  // Create achievements view
  createAchievementsView() {
    const achievementsHTML = `
      <div class="achievements-container glass-panel">
        <div class="achievements-header">
          <h3>🏅 Achievements</h3>
          <div class="achievements-progress">
            <span>${this.getUnlockedAchievements().length} of ${this.achievements.length} unlocked</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(this.getUnlockedAchievements().length / this.achievements.length) * 100}%"></div>
            </div>
          </div>
        </div>
        <div class="achievements-grid">
          ${this.achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-icon">${achievement.icon}</div>
              <div class="achievement-info">
                <h4 class="achievement-title">${achievement.name}</h4>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-points">+${achievement.points} points</div>
              </div>
              ${achievement.unlocked ? '<div class="achievement-unlocked">✓</div>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.achievementsHTML = achievementsHTML;
  }
  
  // Create social sharing buttons
  createSharingButtons() {
    const sharingHTML = `
      <div class="social-sharing glass-panel">
        <h4>Share Your Achievement</h4>
        <div class="sharing-buttons">
          <button class="share-btn twitter" data-platform="twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Share on Twitter
          </button>
          <button class="share-btn linkedin" data-platform="linkedin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share on LinkedIn
          </button>
          <button class="share-btn whatsapp" data-platform="whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Share on WhatsApp
          </button>
          <button class="share-btn copy-link" data-platform="copy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy Link
          </button>
        </div>
      </div>
    `;
    
    this.sharingHTML = sharingHTML;
  }
  
  // Get recent achievements (last 3 unlocked)
  getRecentAchievements() {
    return this.achievements
      .filter(a => a.unlocked)
      .slice(-3)
      .concat(this.achievements.filter(a => !a.unlocked).slice(0, 3 - this.getUnlockedAchievements().length));
  }
  
  // Get unlocked achievements
  getUnlockedAchievements() {
    return this.achievements.filter(a => a.unlocked);
  }
  
  // Initialize leaderboard with mock data
  initializeLeaderboard() {
    // In a real app, this would fetch from a server
    this.updateUserRank();
  }
  
  // Update user rank based on points
  updateUserRank() {
    // Mock ranking logic
    const pointRanges = [
      { min: 2000, rank: Math.floor(Math.random() * 10) + 1 },
      { min: 1500, rank: Math.floor(Math.random() * 50) + 10 },
      { min: 1000, rank: Math.floor(Math.random() * 100) + 50 },
      { min: 500, rank: Math.floor(Math.random() * 500) + 100 },
      { min: 0, rank: Math.floor(Math.random() * 1000) + 500 }
    ];
    
    for (const range of pointRanges) {
      if (this.userProfile.totalPoints >= range.min) {
        this.userProfile.rank = range.rank;
        break;
      }
    }
  }
  
  // Record test completion and check achievements
  recordTestCompletion(score, timeSpent, isFirstTest = false) {
    this.userProfile.testsCompleted++;
    
    // Calculate points based on performance
    let points = Math.floor(score * 2); // Base points
    if (timeSpent < 1800) points += 50; // Bonus for completing under 30 minutes
    if (score === 100) points += 100; // Perfect score bonus
    
    this.userProfile.totalPoints += points;
    
    // Check for achievements
    this.checkAchievements(score, timeSpent, isFirstTest);
    
    this.updateUserRank();
    this.saveUserProfile();
    
    return points;
  }
  
  // Check and unlock achievements
  checkAchievements(score, timeSpent, isFirstTest) {
    const newAchievements = [];
    
    // First test achievement
    if (isFirstTest && !this.achievements.find(a => a.id === 'first_test').unlocked) {
      this.unlockAchievement('first_test');
      newAchievements.push(this.achievements.find(a => a.id === 'first_test'));
    }
    
    // Perfect score achievement
    if (score === 100 && !this.achievements.find(a => a.id === 'perfect_score').unlocked) {
      this.unlockAchievement('perfect_score');
      newAchievements.push(this.achievements.find(a => a.id === 'perfect_score'));
    }
    
    // Speed demon achievement
    if (timeSpent < 1800 && !this.achievements.find(a => a.id === 'speed_demon').unlocked) {
      this.unlockAchievement('speed_demon');
      newAchievements.push(this.achievements.find(a => a.id === 'speed_demon'));
    }
    
    // Knowledge master achievement
    if (this.userProfile.testsCompleted >= 50 && !this.achievements.find(a => a.id === 'knowledge_master').unlocked) {
      this.unlockAchievement('knowledge_master');
      newAchievements.push(this.achievements.find(a => a.id === 'knowledge_master'));
    }
    
    return newAchievements;
  }
  
  // Unlock specific achievement
  unlockAchievement(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      this.userProfile.totalPoints += achievement.points;
      
      // Save unlocked achievements
      const unlocked = this.achievements.filter(a => a.unlocked).map(a => a.id);
      localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
      
      // Show achievement notification
      this.showAchievementNotification(achievement);
    }
  }
  
  // Show achievement notification
  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification glass-panel';
    notification.innerHTML = `
      <div class="achievement-notification-content">
        <div class="achievement-icon-large">${achievement.icon}</div>
        <div class="achievement-details">
          <h3>Achievement Unlocked!</h3>
          <h4>${achievement.name}</h4>
          <p>${achievement.description}</p>
          <div class="points-earned">+${achievement.points} points</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
  }
  
  // Social sharing functionality
  shareAchievement(platform, achievement) {
    const shareText = `🎉 I just unlocked "${achievement.name}" achievement on Units & Measurements Mock Test! ${achievement.description} 🏆`;
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(() => {
          this.showToast('Link copied to clipboard!');
        });
        break;
    }
  }
  
  // Show toast notification
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    const container = document.getElementById('toast-container') || document.body;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
  }
  
  // Get social features HTML for injection
  getSocialFeaturesHTML() {
    return `
      <div class="social-features-container">
        ${this.profileCardHTML}
        ${this.leaderboardHTML}
        ${this.achievementsHTML}
        ${this.sharingHTML}
      </div>
    `;
  }
  
  // Setup event listeners for social features
  setupEventListeners() {
    // Leaderboard filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        // In a real app, this would filter the leaderboard data
      }
      
      // Social sharing buttons
      if (e.target.closest('.share-btn')) {
        const btn = e.target.closest('.share-btn');
        const platform = btn.dataset.platform;
        this.shareAchievement(platform, this.getRecentAchievements()[0]);
      }
    });
  }
}

// Export for global access
window.SocialFeatures = SocialFeatures;