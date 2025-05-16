
export const successRes = (res, msg, record = '') => {

  var response = {
    status: true,
    code: 200,
    message: msg
  };

  if (record)
    response.data = record;

  return res.status(200).json(response);
};

export const failedRes = (res, msg) => {
  var response = {
    status: false,
    code: 401,
    message: msg
  };
  // return res.status(400).json(response);
  return res.status(401).json(response);
};

export const notFoundRes = (res) => {
  let response = {
    status: false,
    code: 200,
    message: 'Not Found Any Records.'
  };
  return res.status(200).json(response);
};

export const validationRes = (res, msg) => {
  var response = {
    status: false,
    code: 422,
    message: msg
  };
  return res.status(422).json(response);
};


export const recordRes = (res, record) => {

  return res.status(200).json({ status: true, code: 200, data: record });
}

export const serverError = (res, msg = null) => {
  if (msg == null)
    msg = 'An unexpected error occurred on the server. Please try again later.';

  var response = {
    status: false,
    code: 500,
    message: msg
  };
  return res.status(500).json(response);
}

export const recordsRes = (res, records, pagination = null) => {

  const defaultPagination = {
    total_count: 0,
    total_page: 0,
    page: 0,
    limit: 0
  };

  const paginationData = pagination || defaultPagination;

  const count = Object.keys(records).length;
  return res.status(200).json(
    {
      status: true,
      code: 200,
      count: count,
      records: records,
      pagination: paginationData
    });
}
