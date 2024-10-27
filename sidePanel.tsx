import SignerItem from './SignerItem/SignerItem';

<div>
    {users?.map((user) =>
        user.role !== 'Editor' ? (
            <SignerItem
                key={user.id}
                user={user}
                isSelected={selectedSignee.id === user.id}
                onSigneeChange={signeeChanged}
                onDelete={deleteUser}
            />
        ) : null
    )}
</div>