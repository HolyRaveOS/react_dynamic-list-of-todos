import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  currentTodo: Todo;
  onSetCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  onSetCurrentTodo,
}) => {
  const [checkedUser, setCheckedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(setCheckedUser)
      .finally(() => setIsUserLoading(true));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            <button
              aria-label="close modal"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSetCurrentTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo && (
                <strong
                  className={
                    currentTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>
              )}

              {' by '}

              <a href={`mailto:${checkedUser?.email}`}>{checkedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
