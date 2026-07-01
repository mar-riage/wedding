const countdown = () => {
  const endDate = new Date("2026-09-26T00:00:00");
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "<h2>Событие наступило!</h2>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
};

countdown();
setInterval(countdown, 1000);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); 
          }
        });
      }, {
        threshold: 0.1 
      });
    
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

      document.getElementById('myForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Блокируем стандартную перезагрузку страницы
        
        const form = e.target;
        const formData = new FormData(form);
        const params = new URLSearchParams();
      
        // 1. Собираем все обычные текстовые поля, email и т.д.
        for (const [key, value] of formData.entries()) {
          // Пропускаем имена со скобками [], их обработаем отдельно ниже
          if (!key.endsWith('[]')) {
            params.append(key, value);
          }
        }
      
        // 2. Находим имя группы чекбоксов (например, "interests[]")
        // Ищем все отмеченные чекбоксы, имя которых заканчивается на []
        const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');
        
        // Группируем чекбоксы по их базовому имени (без скобок)
        const groupedCheckboxes = {};
        checkedBoxes.forEach(cb => {
          const baseName = cb.name.replace('[]', ''); // превращаем "interests[]" в "interests"
          if (!groupedCheckboxes[baseName]) {
            groupedCheckboxes[baseName] = [];
          }
          groupedCheckboxes[baseName].push(cb.value);
        });
      
        // 3. Объединяем выбранные чекбоксы через запятую и добавляем к параметрам
        for (const baseName in groupedCheckboxes) {
          params.append(baseName, groupedCheckboxes[baseName].join(', '));
        }
      
        // URL вашего веб-приложения Google Apps Script
        const googleFormUrl = 'https://script.google.com/macros/s/AKfycbxERJa7AJxOKTlNBjcD_iexOEjfzgzfqypmodqtJmSgoL2oit6epsb9Mev_p8L2GfAQhA/exec';
      
        // 4. Отправляем данные
        fetch(googleFormUrl, {
          method: 'POST',
          body: params, // Передаем URLSearchParams вместо FormData
          mode: 'no-cors' // Оставляем no-cors, если не настраивали CORS-заголовки в ответе
        })
        .then(() => {
          alert('Форма успешно отправлена!');
          form.reset(); // Очищаем форму
        })
        .catch(error => {
          console.error('Ошибка при отправке:', error);
        });
      });
      
