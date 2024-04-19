import {database} from './firebase';
import {ref, set, get, child} from 'firebase/database';


export const writeUserCalorieData = async (userId, currCalorie) => {
    get(child(ref(database), userId)).then((snapshot) => {
        if (snapshot.exists()) {
          const cc = snapshot.val().caloriesConsumed;
          console.log(cc);
          const recipes = snapshot.val().savedRecipes;
          console.log(currCalorie);
          const updated = cc + currCalorie;
          console.log(updated);
          set(ref(database, userId), {
            caloriesConsumed: updated, 
            savedRecipes: recipes
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



  export const getUserCalorieData = async (userId) => {
    get(child(ref(database), userId)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().caloriesConsumed);
            return snapshot.val().caloriesConsumed;
        }
        else{
            return 0;
        }
    })
  }


  export const writeUserSavedRecipe = async(userId, recipeName) => {
    get(child(ref(database), userId)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData.savedRecipes);
        // Update the savedRecipes array by adding the new recipe name
        const updatedRecipes = [...userData.savedRecipes, recipeName];
        const cals = userData.caloriesConsumed;
        console.log(updatedRecipes);
        set(ref(database, userId), {
          caloriesConsumed: cals,
          savedRecipes: updatedRecipes
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



