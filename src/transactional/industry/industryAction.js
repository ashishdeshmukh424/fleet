import database from '../../data/database';
import { valueValidators } from '../../utils/validators';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../../utils/responses';
import { errorHandlers, errors } from '../../utils/errors';
import modelActions from '../modelActions';
import { encrypt } from '../../utils/crypto/encrypt';



const INDUSTRY = 'Industry';

const industryActions = {

  getAllIndustrys: async (query) => {
    try {
      const response = await database[INDUSTRY].getAll({ isDeleted: false }, null);
      console.log('🚀 ^~^ - getAllUsers: - response:', response);
      // const encryptUser = encrypt(JSON.stringify(response));

      return new SuccessResponse(response);
    } catch (exception) {
      // eslint-disable-next-line
          console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

  getIndustryByID: async (id) => {
    try {
      const response = await modelActions.getOne(INDUSTRY, { id }, true);


      return new SuccessResponse(response);
    } catch (exception) {
      // eslint-disable-next-line
      console.debug(exception);
      errorHandlers.throwException('getUserByEmail', errors.DATABASE_ERROR, exception, `Identifier: ${JSON.stringify(email)}`);
      return new ErrorResponse(exception);
    }
  },
}

export default industryActions;
