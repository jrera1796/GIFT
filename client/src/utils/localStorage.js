export const getSavedGiftIds = () => {
  const savedGiftIds = localStorage.getItem('saved_gifts')
    ? JSON.parse(localStorage.getItem('saved_gifts'))
    : [];

  return savedGiftIds;
};

export const saveGiftIds = (giftIdArr) => {
  if (giftIdArr.length) {
    localStorage.setItem('saved_gifts', JSON.stringify(giftIdArr));
  } else {
    localStorage.removeItem('saved_gifts');
  }
};

export const removeGiftId = (giftId) => {
  const savedGiftIds = localStorage.getItem('saved_gifts')
    ? JSON.parse(localStorage.getItem('saved_gifts'))
    : null;

  if (!savedGiftIds) {
    return false;
  }

  const updatedSavedGiftIds = savedGiftIds?.filter((savedGiftId) => savedGiftId !== giftId);
  localStorage.setItem('saved_gifts', JSON.stringify(updatedSavedGiftIds));

  return true;
};
