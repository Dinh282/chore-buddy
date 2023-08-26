import { createContext, useState } from 'react';

export const ChoreContext = createContext();

export const ChoreProvider = ({ children }) => {
    const [users, setUsers] = useState({});
    const [activeUser, setActiveUser] = useState(null);

    const addUser = (name) => {
        setUsers(prevUsers => {
            const updatedUsers = {
                ...prevUsers,
                [name]: { chores: [], totalEarned: 0 }
            };
    
            // Set the child being added, as the active child
            if (Object.keys(updatedUsers).length === 1) {
                setActiveUser(name);
            }
    
            return updatedUsers;
        });
    };
    
    
    return (
        <ChoreContext.Provider value={{ users, setUsers, activeUser, setActiveUser, addUser }}>
            {children}
        </ChoreContext.Provider>
    );
};
