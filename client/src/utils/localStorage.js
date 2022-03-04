export const getSavedGiftIds = () => {
  console.log('In getSavedGiftIds');
  const savedGiftIds = localStorage.getItem('saved_gifts')
    ? JSON.parse(localStorage.getItem('saved_gifts'))
    : [];

  return savedGiftIds;
};

export const saveGiftIds = (giftIdArr) => {
  console.log('In saveGiftIds');
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


export const removeRecipientId = (recipientId) => {
  const savedRecipientIds = localStorage.getItem('saved_recipients')
    ? JSON.parse(localStorage.getItem('saved_recipients'))
    : null;

  if (!savedRecipientIds) {
    return false;
  }

  const updatedSavedRecipientIds = savedRecipientIds?.filter((savedRecipientId) => savedRecipientId !== recipientId);
  localStorage.setItem('saved_recipients', JSON.stringify(updatedSavedRecipientIds));

  return true;
};