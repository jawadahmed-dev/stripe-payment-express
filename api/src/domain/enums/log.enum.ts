export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

export enum LogEventType {
  PAYMENT_INITIATED = 'payment_initiated',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_CANCELED = 'subscription_canceled',
  SYSTEM_ERROR = 'system_error',
  USER_ACTION = 'user_action',
  // Add more as needed
}

export enum LogSourceType {
  PAYMENT_SERVICE = 'payment_service',
  CRON_JOBS = 'cron_jobs',
  // Add more as needed
}

// domain/logging/LogTag.ts

export enum LogTag {
  // Domain-level
  PAYMENT = 'payment',
  SUBSCRIPTION = 'subscription',
  USER = 'user',
  AUTH = 'auth',
  BILLING = 'billing',
  CRON = 'cron',
  NOTIFICATION = 'notification',
  ORDER = 'order',

  // Technical/Behavioral
  API_CALL = 'api_call',
  VALIDATION = 'validation',
  RETRY = 'retry',
  TIMEOUT = 'timeout',
  FAILURE = 'failure',
  SUCCESS = 'success',
  EXCEPTION = 'exception',
  SYSTEM = 'system',
  DATABASE = 'database',
}
