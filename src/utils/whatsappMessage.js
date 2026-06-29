export function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function buildFoodDrinksList(selectedFoods) {
  const drinkItems = [
    'Cold Coffee', 'Hot Coffee', 'Masala Chai', 'Lemon Tea',
    'Fresh Lime Soda', 'Mocktail', 'Soft Drink', 'Mango Shake',
    'Chocolate Shake', 'Mineral Water',
  ];
  const foods = selectedFoods.filter((f) => !drinkItems.includes(f));
  const drinks = selectedFoods.filter((f) => drinkItems.includes(f));

  let list = '';
  if (foods.length > 0) list += 'Food: ' + foods.join(', ');
  if (drinks.length > 0) {
    if (list) list += '\n';
    list += 'Drinks: ' + drinks.join(', ');
  }
  return list || selectedFoods.join(', ');
}

export function createWhatsAppMessage({ selectedDate, location, mealType, foods }) {
  const formattedDate = formatDate(selectedDate);
  const foodDrinksList = buildFoodDrinksList(foods);

  return `Our date is confirmed ❤️

Date: ${formattedDate}
Location: ${location}
Plan: ${mealType}
Food & Drinks: ${foodDrinksList}

See you soon, Pratik ❤️`;
}

export function createWhatsAppUrl(data) {
  const message = createWhatsAppMessage(data);
  return `https://wa.me/917047448557?text=${encodeURIComponent(message)}`;
}
