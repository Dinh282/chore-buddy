import { createContext, useState } from 'react';

export const ChoreContext = createContext({
    activeUser: { id: null, name: null, chores: [] },
    setActiveUser: () => {},
});

export const ChoreProvider = ({ children }) => {
    const [users, setUsers] = useState({});
    const [activeUser, setActiveUser] = useState({ id: null, name: null, chores: [] });

    const addUser = (name) => {
        setUsers(prevUsers => {
            const updatedUsers = {
                ...prevUsers,
                [name]: { id: name, chores: [], totalEarned: 0 }
            };
    
            // Set the child being added, as the active child
            if (Object.keys(updatedUsers).length === 1) {
                setActiveUser({ id: name, name });
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
