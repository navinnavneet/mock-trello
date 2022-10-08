const key = "679403bb5ae5ee89ea6ef2d64f9207f6";
const token =
  "ec15f4457724955a4afc89171d768996cacbdbae90d2028be2000b9dbcc68198";
const idBoard = "633d1a9b5baffb0331510169";

export async function getLists() {
  return fetch(
    `https://api.trello.com/1/boards/${idBoard}/lists?key=${key}&token=${token}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function createList(name) {
  return fetch(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${idBoard}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );
}

export async function getCards(id) {
  return fetch(
    `https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function createCard(id, name) {
  return fetch(
    `https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
}

export async function deleteList(id) {
  return fetch(
    `https://api.trello.com/1/lists/${id}/closed?value=${true}&key=${key}&token=${token}`,
    {
      method: "PUT",
    }
  );
}

export async function deleteCard(id) {
  return fetch(
    `https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`,
    {
      method: "DELETE",
    }
  );
}

export async function getCheckListItems(id) {
  return fetch(
    `https://api.trello.com/1/cards/${id}/checkItemStates?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );
}

export async function getCheckLists(id) {
  return fetch(
    `https://api.trello.com/1/cards/${id}/checklists?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );
}

export async function createCheckList(id, name) {
  return fetch(
    `https://api.trello.com/1/cards/${id}/checklists?name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );
}
