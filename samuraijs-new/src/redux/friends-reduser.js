let initialState = {
      friends: [
        { id: 1, name: "Митя", imgPath: "https://avatars.dzeninfra.ru/get-zen_doc/62191/pub_5d46ef138da1ce00af96680b_5d472c4ae6cb9b00ad5bdddb/scale_1200" },
        { id: 2, name: "Мотя", imgPath: "https://avatars.dzeninfra.ru/get-zen_doc/1866101/pub_6503e42bffb3f010e7c18488_6503e889f277c224a7deeed4/scale_1200" },
      ]
    }

const friendsReduser = (state = initialState) => {
  return state;
}

export default friendsReduser;