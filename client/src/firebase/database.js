import {database} from './firebase';
import {ref, set, get, child} from 'firebase/database';


export const writeUserData = async (userId, currCalorie) => {

    get(child(ref(database), userId)).then((snapshot) => {
        if (snapshot.exists()) {
          const cc = snapshot.val().caloriesConsumed;
          console.log(cc);
          console.log(currCalorie);
          const updated = cc + currCalorie;
          console.log(updated);
          set(ref(database, userId), {
            caloriesConsumed: updated
          })
          .then(() => {
              console.log('Data saved successfully!');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("No data available");
        }
      })   
  }

  export const getUserData = (userId) => {
    get(child(ref(database), userId)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val().caloriesConsumed;
        }
        else{
            return 0;
        }
    })
  }




