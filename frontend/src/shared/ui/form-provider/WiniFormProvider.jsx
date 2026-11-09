import { winiFormContext } from '../../model/formContext';

export const WiniFormProvider = ({ children, ...props }) => {
  return (
    <winiFormContext.Provider {...props}>{children}</winiFormContext.Provider>
  );
};
