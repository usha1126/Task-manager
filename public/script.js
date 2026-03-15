// DOM element references
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskStatus = document.getElementById('task-status');
const taskList = document.getElementById('task-list');

// Progress indicator functions
function showProgress() {
  document.getElementById('progress-container').style.display = 'block';
}

function hideProgress() {
  document.getElementById('progress-container').style.display = 'none';
}

// Update task statistics
function updateTaskStats(tasks) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    'in-progress': tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length
  };

  document.getElementById('total-tasks').textContent = stats.total;
  document.getElementById('pending-tasks').textContent = stats.pending;
  document.getElementById('in-progress-tasks').textContent = stats['in-progress'];
  document.getElementById('completed-tasks').textContent = stats.completed;

  // Animate stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 + index * 0.1}s`;
    card.style.animation = 'bounceIn 0.6s ease-out both';
  });
}

// Add bounceIn animation
const bounceInStyle = document.createElement('style');
bounceInStyle.textContent = `
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(bounceInStyle);

// Add CSS for fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(fadeOutStyle);

// Enhanced form validation with visual feedback
taskTitle.addEventListener('input', function() {
  if (this.value.trim().length > 0) {
    this.style.borderColor = '#4CAF50';
    this.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
  } else {
    this.style.borderColor = '#ddd';
    this.style.boxShadow = 'none';
  }
});

taskTitle.addEventListener('blur', function() {
  if (this.value.trim().length === 0) {
    this.style.borderColor = '#f44336';
    this.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
  }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + Enter to add task
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// Add CSS for slideOutRight animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Get status icon
function getStatusIcon(status) {
  switch(status) {
    case 'pending':
      return '<i class="fas fa-clock"></i>';
    case 'in-progress':
      return '<i class="fas fa-spinner fa-spin"></i>';
    case 'completed':
      return '<i class="fas fa-check-circle"></i>';
    default:
      return '<i class="fas fa-question-circle"></i>';
  }
}

// Add task
function addTask() {
  const title = taskTitle.value.trim();
  if (!title) {
    showToast('Please enter a task title', 'error');
    taskTitle.focus();
    return;
  }

  const addButton = document.querySelector('.task-form button');
  const originalText = addButton.innerHTML;
  addButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  addButton.disabled = true;

  showProgress();

  const task = {
    title: title,
    description: taskDescription.value.trim(),
    status: taskStatus.value
  };

  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  .then(response => response.json())
  .then(data => {
    taskTitle.value = '';
    taskDescription.value = '';
    taskStatus.value = 'pending';
    showToast('Task added successfully!', 'success');
    loadTasks();
  })
  .catch(error => {
    console.error('Error:', error);
    showToast('Failed to add task. Please try again.', 'error');
  })
  .finally(() => {
    addButton.innerHTML = originalText;
    addButton.disabled = false;
    hideProgress();
  });
}

// Load tasks
function loadTasks() {
  taskList.classList.add('loading');
  taskList.innerHTML = '<div class="loading-spinner"></div>';

  fetch('/api/tasks')
  .then(response => response.json())
  .then(tasks => {
    taskList.classList.remove('loading');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task);
      taskElement.style.animationDelay = `${index * 0.1}s`;
      taskList.appendChild(taskElement);
    });
    updateTaskStats(tasks);
  })
  .catch(error => {
    console.error('Error:', error);
    taskList.classList.remove('loading');
    taskList.innerHTML = '<p style="text-align: center; color: #f44336;">Failed to load tasks. Please refresh the page.</p>';
    showToast('Failed to load tasks', 'error');
  });
}

// Create task element
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-item';
  const statusIcon = getStatusIcon(task.status);
  taskDiv.innerHTML = `
    <h3><i class="fas fa-clipboard-list"></i> ${task.title}</h3>
    <p><i class="fas fa-align-left"></i> ${task.description || 'No description'}</p>
    <p><span class="status ${task.status.replace('-', '-')}">${statusIcon} ${task.status.replace('-', ' ')}</span></p>
    <p><small><i class="fas fa-calendar-alt"></i> Created: ${new Date(task.created_at).toLocaleString()}</small></p>
    <div class="actions">
      <button class="edit-btn" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')"><i class="fas fa-edit"></i> Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i> Delete</button>
    </div>
  `;
  return taskDiv;
}

// Edit task
function editTask(id, title, description, status) {
  const taskDiv = event.target.closest('.task-item');
  taskDiv.classList.add('editing');
  taskDiv.innerHTML = `
    <input type="text" value="${title}" id="edit-title-${id}">
    <textarea id="edit-description-${id}">${description}</textarea>
    <select id="edit-status-${id}">
      <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
      <option value="in-progress" ${status === 'in-progress' ? 'selected' : ''}>In Progress</option>
      <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
    </select>
    <div class="actions">
      <button class="save-btn" onclick="saveTask(${id})"><i class="fas fa-save"></i> Save</button>
      <button class="cancel-btn" onclick="loadTasks()"><i class="fas fa-times"></i> Cancel</button>
    </div>
  `;
}

// Save task
function saveTask(id) {
  const title = document.getElementById(`edit-title-${id}`).value.trim();
  if (!title) {
    showToast('Please enter a task title', 'error');
    document.getElementById(`edit-title-${id}`).focus();
    return;
  }

  const saveButton = event.target.closest('.actions').querySelector('.save-btn');
  const originalText = saveButton.innerHTML;
  saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  saveButton.disabled = true;

  const task = {
    title: title,
    description: document.getElementById(`edit-description-${id}`).value.trim(),
    status: document.getElementById(`edit-status-${id}`).value
  };

  fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  .then(response => response.json())
  .then(data => {
    showToast('Task updated successfully!', 'success');
    loadTasks();
  })
  .catch(error => {
    console.error('Error:', error);
    showToast('Failed to update task', 'error');
    saveButton.innerHTML = originalText;
    saveButton.disabled = false;
  });
}

// Delete task
function deleteTask(id) {
  // Create custom confirmation dialog
  const confirmDialog = document.createElement('div');
  confirmDialog.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    animation: fadeIn 0.3s ease-out;
  `;

  confirmDialog.innerHTML = `
    <div style="
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      max-width: 400px;
      width: 90%;
      text-align: center;
    ">
      <h3 style="margin: 0 0 15px 0; color: #333;"><i class="fas fa-exclamation-triangle" style="color: #ff9800;"></i> Delete Task</h3>
      <p style="margin: 0 0 20px 0; color: #666;">Are you sure you want to delete this task? This action cannot be undone.</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button onclick="confirmDelete(${id})" style="
          padding: 8px 16px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        ">
          <i class="fas fa-trash"></i> Delete
        </button>
        <button onclick="cancelDelete()" style="
          padding: 8px 16px;
          background: #9e9e9e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        ">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(confirmDialog);

  window.confirmDelete = function(taskId) {
    document.body.removeChild(confirmDialog);
    performDelete(taskId);
  };

  window.cancelDelete = function() {
    document.body.removeChild(confirmDialog);
  };
}

function performDelete(id) {
  fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    showToast('Task deleted successfully!', 'success');
    loadTasks();
  })
  .catch(error => {
    console.error('Error:', error);
    showToast('Failed to delete task', 'error');
  });
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
  // Show welcome message
  setTimeout(() => {
    showToast('Welcome to Task Manager! 🎉', 'success', 2000);
  }, 500);

  loadTasks();
});