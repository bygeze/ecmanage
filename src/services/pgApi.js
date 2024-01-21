    
const apiUrl = () => {
    return process.env.REACT_APP_PG_API_URL;
}

const pgApi = {


    fetchData: async () => {
        try {   
            const response = await fetch(apiUrl() + 'test');
            const data = await response.json();
            console.log(data.tables); // This will be the array of table names
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    fetchSubjects: async (uid) => {
        try {
            const response = await fetch(apiUrl() + 'subjects/'+ uid);
            console.log(response);
            const data = await response.json(); 
            //console.log(data); // This will be the array of table names
            return JSON.parse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }    
    },

    fetchUnits: async (uid) => {
        try {
            const response = await fetch(apiUrl() + 'units/'+ uid);
            const data = await response.json();
            //console.log(data); // This will be the array of table names
            return JSON.parse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }    
    },

    fetchBookEntries: async (uid) => {
        try {
            const response = await fetch(apiUrl() + 'book-entries/'+ uid);
            const data = await response.json();
            //console.log(data); // This will be the array of table names
            return JSON.parse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }    
    },

    createSubject: async (subject) => {
        try {
            // POST TO SUBJECTS
            const response = await fetch(apiUrl() + 'subjects', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(subject),
            });
            
            // if response OK returns subject
            if (response.ok) {
              const newSubject = await response.json();
              return newSubject;
            // else returns false
            } else {
              console.error('Failed to create subject:', response.statusText);
              return false;
            }
          } catch (error) {
            console.error('Error:', error.message);
            return false;
          }
    },

    updateSubject: async (id, updates, uid) => {
        try {
            const response = await fetch(apiUrl() + `subjects/${uid}/${id}`, {
                method: 'PATCH', // or 'PUT' depending on your API design
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to update subject:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error updating subject:', error.message);
            return false;
        }
    },

    deleteSubject: async (id) => {
        try {
          const response = await fetch(apiUrl() + `subjects/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            
            console.log('Subject deleted successfully');
            return true;
          } else {
            
            console.error('Failed to delete subject');
            return false;
          }
        } catch (error) {
          console.error('Error deleting subject:', error);
          return false;
        }
      },

      createUnit: async (unit) => {
        try {
            // POST TO SUBJECTS
            const response = await fetch(apiUrl() + 'units', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(unit),
            });
            
            // if response OK returns subject
            if (response.ok) {
              const data = await response.json();
              return data;
            // else returns false
            } else {
              console.error('Failed to create subject:', response.statusText);
              return false;
            }
          } catch (error) {
            console.error('Error:', error.message);
            return false;
          }
    },

    deleteUnit: async (id) => {
        try {
          const response = await fetch(apiUrl() + `units/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            
            console.log('Subject deleted successfully');
            return true;
          } else {
            
            console.error('Failed to delete subject');
            return false;
          }
        } catch (error) {
          console.error('Error deleting subject:', error);
          return false;
        }
    },

    createBookEntry: async (entry) => {
        try {
            // POST TO SUBJECTS
            const response = await fetch(apiUrl() + 'book-entries', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(entry),
            });
            
            // if response OK returns subject
            if (response.ok) {
              const data = await response.json();
              return data;
            // else returns false
            } else {
              console.error('Failed to create subject:', response.statusText);
              return false;
            }
          } catch (error) {
            console.error('Error:', error.message);
            return false;
          }
    },

    deleteBookEntry: async (id) => {
        try {
          const response = await fetch(apiUrl() + `book-entries/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            
            console.log('Subject deleted successfully');
            return true;
          } else {
            
            console.error('Failed to delete subject');
            return false;
          }
        } catch (error) {
          console.error('Error deleting subject:', error);
          return false;
        }
    },
}

export default pgApi;