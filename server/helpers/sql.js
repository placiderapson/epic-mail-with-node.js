/**
 * an sql object for storing all sql queries
 */
const sql = {};

/**
 * sql queries for processing data
 */
const admin = 'INSERT INTO users(firstname, lastname, username, email, password, isadmin, registered) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING';
const registerUser = 'INSERT INTO users(firstname, lastname, username, email, password, registered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ';
const retrieveAllUsers = 'SELECT * FROM users';
const loginUser = 'SELECT * FROM users WHERE email = $1';
const retrieveSpecificUser = 'SELECT * FROM users WHERE email = $1';
const retrieveSpecificUserById = 'SELECT * FROM users WHERE id = $1';
const deleteSpecificUser = 'DELETE FROM users WHERE id = $1';
const sendEmail = 'INSERT INTO sentemails(subject, message, parentmessageid, senderemail, receiveremail, status, createdon) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const draftEmail = 'INSERT INTO draftemails(subject, message, parentmessageid, senderemail, receiveremail, status, createdon) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const delivered = 'INSERT INTO receivedemails(subject, message, parentmessageid, senderemail, receiveremail, status, createdon) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const emailRead = 'UPDATE receivedemails SET status = $1 WHERE id = $2 RETURNING *';
const retrieveAllEmails = 'SELECT * FROM receivedemails';
const retrieveSpecificReceivedEmail = 'SELECT * FROM receivedemails WHERE id = $1 AND receiveremail = $2';
const retrieveSpecificSentEmail = 'SELECT * FROM sentemails WHERE id = $1 AND senderemail = $2';
const retrieveSpecificDraftEmail = 'SELECT * FROM draftemails WHERE id = $1 AND senderemail = $2';
const deleteSpecificEmail = 'DELETE FROM receivedemails WHERE id = $1';
const deleteSpecificSentEmail = 'DELETE FROM sentemails WHERE id = $1';
const deleteSpecificDraftEmail = 'DELETE FROM draftemails WHERE id = $1';
const retrieveSentEmails = 'SELECT * FROM sentemails WHERE senderemail = $1';
const retrieveReadEmails = 'SELECT * FROM receivedemails WHERE status = $1 AND receiveremail = $2';
const retrieveUnreadEmails = 'SELECT * FROM receivedemails WHERE status = $1 AND receiveremail = $2';
const retrieveDraftEmails = 'SELECT * FROM draftemails WHERE status = $1 AND senderemail = $2';
const findUserEmail = 'SELECT * FROM users WHERE email = $1';
const findUsername = 'SELECT * FROM users WHERE username = $1';
const retrieveAdmin = 'SELECT * FROM users WHERE email = $1 AND isadmin = $2';
const retrieveUserSpecificReceivedEmail = 'SELECT * FROM receivedemails WHERE id = $1 AND receiveremail = $2';
const adminRetrieveUserSpecificReceivedEmail = 'SELECT * FROM receivedemails WHERE id = $1';
const retrieveUserSpecificSentEmail = 'SELECT * FROM sentemails WHERE id = $1 AND senderemail = $2';
const adminRetrieveUserSpecificSentEmail = 'SELECT * FROM sentemails WHERE id = $1';
const retrieveUserSpecificDraftEmail = 'SELECT * FROM draftemails WHERE id = $1 AND senderemail = $2';
const adminRetrieveUserSpecificDraftEmail = 'SELECT * FROM draftemails WHERE id = $1';
const adminGetSentEmails = 'SELECT * FROM sentemails';
const adminGetReadEmails = 'SELECT * FROM receivedemails WHERE status = $1';
const adminGetUnreadEmails = 'SELECT * FROM receivedemails WHERE status = $1';
const adminGetDraftEmails = 'SELECT * FROM draftemails WHERE status = $1';
const createGroup = 'INSERT INTO groups(name, role, owner) VALUES($1, $2, $3) RETURNING *';
const retrieveAllGroups = 'SELECT * FROM groups';
const retrieveSpecificGroup = 'SELECT * FROM groups WHERE id = $1';
const updateSpecificGroup = 'UPDATE groups SET name = $1 WHERE id = $2 RETURNING *';
const deleteSpecificGroup = 'DELETE FROM groups WHERE id = $1';
const registerGroupMember = 'INSERT INTO groupmembers(username, email, groupid) VALUES ($1, $2, $3) RETURNING * ';
const retrieveSpecificGroupOwner = 'SELECT * FROM groups WHERE id = $1 AND owner = $2';
const retrieveSpecificGroupMember = 'SELECT * FROM groupmembers WHERE email = $1 AND groupid = $2';
const deleteSpecificGroupMember = 'DELETE FROM groupmembers WHERE id = $1 AND groupid = $2';
const sendGroupEmail = 'INSERT INTO groupmessages(subject, message, parentmessageid, createdon, groupid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const deleteSpecificUserPassword = 'UPDATE users SET password = null WHERE email = $1 ';
const retrieveUserGroups = 'SELECT * FROM groups WHERE owner = $1';
const retrieveUserGroup = 'SELECT * FROM groups WHERE id = $1 AND owner = $2';
const retrieveSpecificGroupMembers = 'SELECT * FROM groupmembers WHERE groupid = $1';
const retrieveSpecificGroupEmails = 'SELECT * FROM groupmessages WHERE groupid = $1';
const retrievePassResetUsers = 'SELECT * FROM users WHERE password isNull';
const retrieveMember = 'SELECT * FROM groupmembers WHERE email = $1 AND groupid = $2';
const findGroup = 'SELECT * FROM groups WHERE name = $1 AND owner = $2';
const retrieveSpecificUserEmails = 'SELECT * FROM receivedemails WHERE receiveremail = $1';
const passResetCheck = 'SELECT * FROM users WHERE email = $1 AND password isNull';
const retrieveMemberEmails = 'SELECT * FROM groupmessages WHERE groupid = $1';


/**
 * assigning object keys their corresponding values
 */
sql.admin = admin;
sql.registerUser = registerUser;
sql.loginUser = loginUser;
sql.retrieveAllUsers = retrieveAllUsers;
sql.retrieveSpecificUser = retrieveSpecificUser;
sql.retrieveSpecificUserById = retrieveSpecificUserById;
sql.deleteSpecificUser = deleteSpecificUser;
sql.sendEmail = sendEmail;
sql.delivered = delivered;
sql.emailRead = emailRead;
sql.draftEmail = draftEmail;
sql.retrieveAllEmails = retrieveAllEmails;
sql.retrieveSpecificReceivedEmail = retrieveSpecificReceivedEmail;
sql.retrieveSpecificSentEmail = retrieveSpecificSentEmail;
sql.retrieveSpecificDraftEmail = retrieveSpecificDraftEmail;
sql.deleteSpecificEmail = deleteSpecificEmail;
sql.deleteSpecificSentEmail = deleteSpecificSentEmail;
sql.deleteSpecificDraftEmail = deleteSpecificDraftEmail;
sql.retrieveSentEmails = retrieveSentEmails;
sql.retrieveReadEmails = retrieveReadEmails;
sql.retrieveUnreadEmails = retrieveUnreadEmails;
sql.retrieveDraftEmails = retrieveDraftEmails;
sql.findUserEmail = findUserEmail;
sql.findUsername = findUsername;
sql.retrieveAdmin = retrieveAdmin;
sql.retrieveUserSpecificReceivedEmail = retrieveUserSpecificReceivedEmail;
sql.adminRetrieveUserSpecificReceivedEmail = adminRetrieveUserSpecificReceivedEmail;
sql.retrieveUserSpecificSentEmail = retrieveUserSpecificSentEmail;
sql.adminRetrieveUserSpecificSentEmail = adminRetrieveUserSpecificSentEmail;
sql.retrieveUserSpecificDraftEmail = retrieveUserSpecificDraftEmail;
sql.adminRetrieveUserSpecificDraftEmail = adminRetrieveUserSpecificDraftEmail;
sql.adminGetSentEmails = adminGetSentEmails;
sql.adminGetReadEmails = adminGetReadEmails;
sql.adminGetUnreadEmails = adminGetUnreadEmails;
sql.adminGetDraftEmails = adminGetDraftEmails;
sql.createGroup = createGroup;
sql.retrieveAllGroups = retrieveAllGroups;
sql.retrieveSpecificGroup = retrieveSpecificGroup;
sql.updateSpecificGroup = updateSpecificGroup;
sql.deleteSpecificGroup = deleteSpecificGroup;
sql.registerGroupMember = registerGroupMember;
sql.retrieveSpecificGroupOwner = retrieveSpecificGroupOwner;
sql.retrieveSpecificGroupMember = retrieveSpecificGroupMember;
sql.deleteSpecificGroupMember = deleteSpecificGroupMember;
sql.sendGroupEmail = sendGroupEmail;
sql.deleteSpecificUserPassword = deleteSpecificUserPassword;
sql.retrieveUserGroups = retrieveUserGroups;
sql.retrieveUserGroup = retrieveUserGroup;
sql.retrieveSpecificGroupMembers = retrieveSpecificGroupMembers;
sql.retrieveSpecificGroupEmails = retrieveSpecificGroupEmails;
sql.retrieveMemberEmails = retrieveMemberEmails;
sql.retrievePassResetUsers = retrievePassResetUsers;
sql.retrieveMember = retrieveMember;
sql.findGroup = findGroup;
sql.retrieveSpecificUserEmails = retrieveSpecificUserEmails;
sql.passResetCheck = passResetCheck;

export default sql;
