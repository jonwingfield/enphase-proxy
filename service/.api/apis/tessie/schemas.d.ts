declare const ActivateFrontTrunk: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ActivateRearTrunk: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AddChargeSchedule: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly days_of_week: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma separated list of days this schedule should be enabled. Example: \"Thursday,Saturday\". Also supports \"All\" and \"Weekdays\".";
                };
                readonly enabled: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this schedule should be considered for execution.";
                };
                readonly start_enabled: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the vehicle should begin charging at the given start_time.";
                };
                readonly end_enabled: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the vehicle should stop charging after the given end_time.";
                };
                readonly one_time: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this is a one-time schedule.";
                };
                readonly id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of an existing schedule to modify. Omit if creating a new schedule.";
                };
                readonly start_time: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of minutes into the day this schedule begins. 1:05 AM is represented as 65. Omit if start_enabled set to false.";
                };
                readonly end_time: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of minutes into the day this schedule ends. 1:05 AM is represented as 65. Omit if end_enabled set to false.";
                };
                readonly lat: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The approximate latitude the vehicle must be at to use this schedule.";
                };
                readonly lon: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The approximate longitude the vehicle must be at to use this schedule.";
                };
            };
            readonly required: readonly ["days_of_week", "enabled", "start_enabled", "end_enabled", "lat", "lon"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AddPreconditionSchedule: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly days_of_week: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma separated list of days this schedule should be enabled. Example: \"Thursday,Saturday\". Also supports \"All\" and \"Weekdays\".";
                };
                readonly enabled: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this schedule should be considered for execution.";
                };
                readonly one_time: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this is a one-time schedule.";
                };
                readonly id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of an existing schedule to modify. Omit if creating a new schedule.";
                };
                readonly precondition_time: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of minutes into the day the vehicle should complete preconditioning. 1:05 AM is represented as 65.";
                };
                readonly lat: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The approximate latitude the vehicle must be at to use this schedule.";
                };
                readonly lon: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The approximate longitude the vehicle must be at to use this schedule.";
                };
            };
            readonly required: readonly ["days_of_week", "enabled", "precondition_time", "lat", "lon"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Boombox: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CancelSoftwareUpdate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ClearSpeedLimitPin: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly pin: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated PIN.";
                };
            };
            readonly required: readonly ["pin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CloseChargePort: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CloseSunroof: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CloseTonneau: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CloseWindows: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateInvitation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly Example: {
                    readonly result: {
                        readonly id: 2252267587512112;
                        readonly owner_id: 1234567;
                        readonly share_user_id: any;
                        readonly product_id: "7SAXCBE6XPF123456";
                        readonly state: "pending";
                        readonly code: "asdfGwpumXGXSLHCpWN2DVedKIs7fBpdiqO76Qvyuio";
                        readonly expires_at: "2023-11-29T00:59:06.000Z";
                        readonly revoked_at: any;
                        readonly borrowing_device_id: any;
                        readonly key_id: any;
                        readonly product_type: "vehicle";
                        readonly share_type: "customer";
                        readonly active_pubkeys: readonly [any];
                        readonly id_s: "2252267587512112";
                        readonly owner_id_s: "1234567";
                        readonly share_user_id_s: "";
                        readonly borrowing_key_hash: any;
                        readonly vin: "7SAXCBE6XPF123456";
                        readonly share_link: "https://www.tesla.com/_rs/1/asdfGwpumXGXSLHCpWN2DVedKIs7fBpdiqO76Qvyuio";
                    };
                };
            };
            readonly properties: {
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                        };
                        readonly owner_id: {
                            readonly type: "integer";
                        };
                        readonly share_user_id: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly product_id: {
                            readonly type: "string";
                        };
                        readonly state: {
                            readonly type: "string";
                        };
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly expires_at: {
                            readonly type: "string";
                        };
                        readonly revoked_at: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly borrowing_device_id: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly key_id: {
                            readonly type: readonly ["integer", "null"];
                        };
                        readonly product_type: {
                            readonly type: "string";
                        };
                        readonly share_type: {
                            readonly type: "string";
                        };
                        readonly active_pubkeys: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly id_s: {
                            readonly type: "string";
                        };
                        readonly owner_id_s: {
                            readonly type: "string";
                        };
                        readonly share_user_id_s: {
                            readonly type: "string";
                        };
                        readonly borrowing_key_hash: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly vin: {
                            readonly type: "string";
                        };
                        readonly share_link: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteDriver: {
    readonly body: {
        readonly type: "object";
        readonly "x-examples": {
            readonly Example: {
                readonly user_id: 12345678;
            };
        };
        readonly properties: {
            readonly user_id: {
                readonly type: "integer";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Driver ID.";
                };
            };
            readonly required: readonly ["vin", "id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly result: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteFleetTelemetryConfig: {
    readonly body: {
        readonly type: "object";
        readonly "x-examples": {
            readonly "Example 1": {
                readonly plate: "T12345";
            };
        };
        readonly additionalProperties: true;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly updated_vehicles: {
                    readonly type: "integer";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly updated_vehicles: 1;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DisableGuest: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DisableSentry: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DisableSpeedLimit: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly pin: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated PIN.";
                };
            };
            readonly required: readonly ["pin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DisableValet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EnableGuest: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EnableSentry: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EnableSpeedLimit: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly pin: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated PIN.";
                };
            };
            readonly required: readonly ["pin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EnableValet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Flash: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBattery: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly timestamp: 1710785350;
                    readonly battery_level: 89;
                    readonly battery_range: 273.47;
                    readonly ideal_battery_range: 273.47;
                    readonly phantom_drain_percent: 1;
                    readonly energy_remaining: 85.5;
                    readonly lifetime_energy_used: 3266.888;
                    readonly pack_current: -0.6;
                    readonly pack_voltage: 451.61;
                    readonly module_temp_min: 20.5;
                    readonly module_temp_max: 21;
                };
            };
            readonly properties: {
                readonly timestamp: {
                    readonly type: "integer";
                };
                readonly battery_level: {
                    readonly type: "number";
                };
                readonly battery_range: {
                    readonly type: "number";
                };
                readonly ideal_battery_range: {
                    readonly type: "number";
                };
                readonly phantom_drain_percent: {
                    readonly type: "number";
                };
                readonly energy_remaining: {
                    readonly type: "number";
                };
                readonly lifetime_energy_used: {
                    readonly type: "number";
                };
                readonly pack_current: {
                    readonly type: "number";
                };
                readonly pack_voltage: {
                    readonly type: "number";
                };
                readonly module_temp_min: {
                    readonly type: "number";
                };
                readonly module_temp_max: {
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBatteryHealth: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly only_active: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include only active vehicles in the response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly results: readonly [{
                        readonly vin: "5YJXCAE43LF219631";
                        readonly plate: any;
                        readonly odometer: 16380.9;
                        readonly max_range: 303.48;
                        readonly max_ideal_range: 1196;
                        readonly capacity: 96.7;
                        readonly original_capacity: 97.15;
                        readonly degradation_percent: 0.5;
                        readonly health_percent: 99.5;
                    }, {
                        readonly vin: "LRW3F7EK6NC496312";
                        readonly plate: any;
                        readonly odometer: 6008.62;
                        readonly max_range: 353.31;
                        readonly max_ideal_range: 353.31;
                        readonly capacity: 77.56;
                        readonly original_capacity: any;
                        readonly degradation_percent: any;
                        readonly health_percent: any;
                    }, {
                        readonly vin: "5YJSA7E27FF106027";
                        readonly plate: any;
                        readonly odometer: 52794.7;
                        readonly max_range: 319.13;
                        readonly max_ideal_range: 255.31;
                        readonly capacity: 75.99;
                        readonly original_capacity: any;
                        readonly degradation_percent: any;
                        readonly health_percent: any;
                    }, {
                        readonly vin: "7SAXCBE6XPF383426";
                        readonly plate: any;
                        readonly odometer: 2656.61;
                        readonly max_range: 309.61;
                        readonly max_ideal_range: 309.61;
                        readonly capacity: 95.67;
                        readonly original_capacity: 96.15;
                        readonly degradation_percent: 0.5;
                        readonly health_percent: 99.5;
                    }, {
                        readonly vin: "5YJ3E1EA2JF014099";
                        readonly plate: any;
                        readonly odometer: 20125.4;
                        readonly max_range: 309.1;
                        readonly max_ideal_range: 309.1;
                        readonly capacity: 77.31;
                        readonly original_capacity: any;
                        readonly degradation_percent: any;
                        readonly health_percent: any;
                    }, {
                        readonly vin: "XP7YGCEK6PB065973";
                        readonly plate: any;
                        readonly odometer: 9735.12;
                        readonly max_range: 324.33;
                        readonly max_ideal_range: 324.33;
                        readonly capacity: 77.65;
                        readonly original_capacity: any;
                        readonly degradation_percent: any;
                        readonly health_percent: any;
                    }, {
                        readonly vin: "5YJXCDE29HF059245";
                        readonly plate: any;
                        readonly odometer: 20498.7;
                        readonly max_range: 281.37;
                        readonly max_ideal_range: 352.5;
                        readonly capacity: 93.38;
                        readonly original_capacity: 97.27;
                        readonly degradation_percent: 4;
                        readonly health_percent: 96;
                    }];
                };
            };
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly vin: {
                                readonly type: "string";
                            };
                            readonly plate: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly odometer: {
                                readonly type: "number";
                            };
                            readonly max_range: {
                                readonly type: "number";
                            };
                            readonly max_ideal_range: {
                                readonly type: "number";
                            };
                            readonly capacity: {
                                readonly type: "number";
                            };
                            readonly original_capacity: {
                                readonly type: "number";
                            };
                            readonly degradation_percent: {
                                readonly type: "number";
                            };
                            readonly health_percent: {
                                readonly type: "number";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBatteryHealthMeasurements: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly max_range: {
                            readonly type: "number";
                        };
                        readonly max_ideal_range: {
                            readonly type: "number";
                        };
                        readonly capacity: {
                            readonly type: "number";
                        };
                    };
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "number";
                            };
                            readonly odometer: {
                                readonly type: "number";
                            };
                            readonly max_range: {
                                readonly type: "number";
                            };
                            readonly max_ideal_range: {
                                readonly type: "number";
                            };
                            readonly capacity: {
                                readonly type: "number";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCharges: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly default: "json";
                    readonly description: "Whether to output the results in JSON or CSV.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly superchargers_only: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to only include charges from Superchargers.";
                };
                readonly origin_latitude: {
                    readonly type: "number";
                    readonly examples: readonly [37.4925];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The latitude of the charging station.";
                };
                readonly origin_longitude: {
                    readonly type: "number";
                    readonly examples: readonly [121.9447];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The longitude of the charging station.";
                };
                readonly origin_radius: {
                    readonly type: "number";
                    readonly examples: readonly [80];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The radius from the charging station, in meters.";
                };
                readonly exclude_origin: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to exclude the charging station.";
                };
                readonly timezone: {
                    readonly type: "string";
                    readonly default: "UTC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IANA timezone name.";
                };
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly minimum_energy_added: {
                    readonly type: "number";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum energy added to the battery, in kWh.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly title: "Charge";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                            };
                            readonly started_at: {
                                readonly type: "number";
                            };
                            readonly ended_at: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                            };
                            readonly longitude: {
                                readonly type: "number";
                            };
                            readonly is_supercharger: {
                                readonly type: "boolean";
                            };
                            readonly odometer: {
                                readonly type: "number";
                            };
                            readonly energy_added: {
                                readonly type: "number";
                            };
                            readonly energy_used: {
                                readonly type: "number";
                            };
                            readonly miles_added: {
                                readonly type: "number";
                            };
                            readonly miles_added_ideal: {
                                readonly type: "number";
                            };
                            readonly starting_battery: {
                                readonly type: "number";
                            };
                            readonly ending_battery: {
                                readonly type: "number";
                            };
                            readonly cost: {
                                readonly type: "number";
                            };
                        };
                        readonly required: readonly ["id", "started_at", "ended_at", "location", "latitude", "longitude", "is_supercharger", "odometer", "energy_added", "energy_used", "miles_added", "miles_added_ideal", "starting_battery", "ending_battery", "cost"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetConsumption: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly last_charge_at: {
                    readonly type: "integer";
                };
                readonly distance_driven: {
                    readonly type: "number";
                };
                readonly battery_percent_used: {
                    readonly type: "integer";
                };
                readonly battery_percent_used_by_driving: {
                    readonly type: "integer";
                };
                readonly rated_range_used: {
                    readonly type: "number";
                };
                readonly rated_range_used_by_driving: {
                    readonly type: "number";
                };
                readonly ideal_range_used: {
                    readonly type: "number";
                };
                readonly ideal_range_used_by_driving: {
                    readonly type: "number";
                };
                readonly energy_used: {
                    readonly type: "number";
                };
                readonly energy_used_by_driving: {
                    readonly type: "number";
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly last_charge_at: 1675940795;
                    readonly distance_driven: 10.4;
                    readonly battery_percent_used: 10;
                    readonly battery_percent_used_by_driving: 4;
                    readonly rated_range_used: 34.57;
                    readonly rated_range_used_by_driving: 16.75;
                    readonly ideal_range_used: 34.57;
                    readonly ideal_range_used_by_driving: 16.75;
                    readonly energy_used: 7.56;
                    readonly energy_used_by_driving: 3.66;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDrivers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly my_tesla_unique_id: {
                                readonly type: "integer";
                            };
                            readonly user_id: {
                                readonly type: "integer";
                            };
                            readonly user_id_s: {
                                readonly type: "string";
                            };
                            readonly driver_first_name: {
                                readonly type: "string";
                            };
                            readonly driver_last_name: {
                                readonly type: "string";
                            };
                            readonly granular_access: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly hide_private: {
                                        readonly type: "boolean";
                                    };
                                };
                            };
                            readonly active_pubkeys: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly public_key: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly results: readonly [{
                        readonly my_tesla_unique_id: 123456789;
                        readonly user_id: 222222;
                        readonly user_id_s: "222222";
                        readonly driver_first_name: "Jane";
                        readonly driver_last_name: "Doe";
                        readonly granular_access: {
                            readonly hide_private: false;
                        };
                        readonly active_pubkeys: readonly ["043da2708632f7d7c01f6cacdd82400746asdfd475c37a6adfaa19aed565f3e254790c1baaac94ee2c68349642d21e16bf89c70a13019516ed475104c945cb3d53"];
                        readonly public_key: "";
                    }, {
                        readonly my_tesla_unique_id: 12345678;
                        readonly user_id: 111111;
                        readonly user_id_s: "222222";
                        readonly driver_first_name: "John";
                        readonly driver_last_name: "Doe";
                        readonly granular_access: {
                            readonly hide_private: false;
                        };
                        readonly active_pubkeys: readonly ["04b7f61ba31002e4646f647953e2a2813e72e7315asdfe2bfa0badad9d42c0e3762e581c5ae58010146ccd9288333ceff26b84e57ae624fc4f7428ee20e719f00d"];
                        readonly public_key: "04b7f61ba31002e4646f647953e2a2813e72e7315asdfe2bfa0badad9d42c0e3762e581c5ae58010146ccd9288333ceff26b84e57ae624fc4f7428ee20e719f00d";
                    }];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDrives: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly temperature_format: {
                    readonly type: "string";
                    readonly default: "c";
                    readonly enum: readonly ["c", "f"];
                    readonly description: "Whether to return data in Fahrenheit or Celsius.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly timezone: {
                    readonly type: "string";
                    readonly default: "UTC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IANA timezone name.";
                };
                readonly origin_latitude: {
                    readonly type: "number";
                    readonly examples: readonly [37.4925];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The latitude of the starting point.";
                };
                readonly origin_longitude: {
                    readonly type: "number";
                    readonly examples: readonly [121.9447];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The longitude of the starting point.";
                };
                readonly origin_radius: {
                    readonly type: "number";
                    readonly examples: readonly [80];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The radius from the starting point, in meters.";
                };
                readonly exclude_origin: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to exclude the starting point.";
                };
                readonly destination_latitude: {
                    readonly type: "number";
                    readonly examples: readonly [37.4925];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The latitude of the ending point.";
                };
                readonly destination_longitude: {
                    readonly type: "number";
                    readonly examples: readonly [121.9447];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The longitude of the ending point.";
                };
                readonly destination_radius: {
                    readonly type: "number";
                    readonly examples: readonly [80];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The included radius from the ending point, in meters.";
                };
                readonly exclude_destination: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to exclude the ending point.";
                };
                readonly tag: {
                    readonly type: "string";
                    readonly examples: readonly ["Work"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The tag associated with the drive.";
                };
                readonly exclude_tag: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to exclude the tag.";
                };
                readonly driver_profile: {
                    readonly type: "string";
                    readonly examples: readonly ["John"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The driver profile associated with the drive.";
                };
                readonly exclude_driver_profile: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to exclude the driver profile.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly default: "json";
                    readonly description: "Whether to output the results in JSON or CSV.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly minimum_distance: {
                    readonly type: "number";
                    readonly examples: readonly [0.1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum distance driven, in miles.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly title: "Drive";
                        readonly required: readonly ["id", "started_at", "ended_at", "starting_location", "starting_latitude", "starting_longitude", "ending_location", "ending_latitude", "ending_longitude", "starting_battery", "ending_battery", "rated_range_used", "odometer_distance", "energy_used", "tag"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                            };
                            readonly started_at: {
                                readonly type: "number";
                            };
                            readonly ended_at: {
                                readonly type: "number";
                            };
                            readonly starting_location: {
                                readonly type: "string";
                            };
                            readonly starting_latitude: {
                                readonly type: "number";
                            };
                            readonly starting_longitude: {
                                readonly type: "number";
                            };
                            readonly ending_location: {
                                readonly type: "string";
                            };
                            readonly ending_latitude: {
                                readonly type: "number";
                            };
                            readonly ending_longitude: {
                                readonly type: "number";
                            };
                            readonly starting_battery: {
                                readonly type: "number";
                            };
                            readonly ending_battery: {
                                readonly type: "number";
                            };
                            readonly average_inside_temperature: {
                                readonly type: "number";
                            };
                            readonly average_outside_temperature: {
                                readonly type: "number";
                            };
                            readonly average_speed: {
                                readonly type: "number";
                            };
                            readonly max_speed: {
                                readonly type: "number";
                            };
                            readonly rated_range_used: {
                                readonly type: "number";
                            };
                            readonly odometer_distance: {
                                readonly type: "number";
                            };
                            readonly autopilot_distance: {
                                readonly type: readonly ["number", "null"];
                                readonly "x-stoplight": {
                                    readonly id: "txyrdfzgk6qn8";
                                };
                            };
                            readonly energy_used: {
                                readonly type: "number";
                            };
                            readonly tag: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDrivingPath: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly separate: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether the path should be separated by individual drives.";
                };
                readonly simplify: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether the path should be simplified to reduce the number of points.";
                };
                readonly details: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether the path should include details like timestamps, speeds and headings.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {};
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFirmwareAlerts: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly results: readonly [{
                        readonly timestamp: 1726683716;
                        readonly name: "VCFRONT_a361_washerFluidLowMomentary";
                        readonly description: any;
                        readonly recent_fleet_count: 408452;
                    }];
                };
            };
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "integer";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly recent_fleet_count: {
                                readonly type: "integer";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFleetChargingInvoices: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly timezone: {
                    readonly type: "string";
                    readonly default: "UTC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IANA timezone name.";
                };
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["7SA3ASD6XPF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly default: "json";
                    readonly description: "Whether to output the results in JSON or CSV.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly started_at: {
                                readonly type: "integer";
                            };
                            readonly ended_at: {
                                readonly type: "integer";
                            };
                            readonly invoice_number: {
                                readonly type: "string";
                            };
                            readonly vin: {
                                readonly type: "string";
                            };
                            readonly location: {
                                readonly type: "string";
                            };
                            readonly energy_used: {
                                readonly type: "integer";
                            };
                            readonly idle_minutes: {
                                readonly type: "integer";
                            };
                            readonly charging_fees: {
                                readonly type: "number";
                            };
                            readonly idle_fees: {
                                readonly type: "integer";
                            };
                            readonly total_cost: {
                                readonly type: "number";
                            };
                            readonly cost_per_kwh: {
                                readonly type: "number";
                            };
                            readonly currency: {
                                readonly type: "string";
                            };
                            readonly invoice_url: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly results: readonly [{
                        readonly id: 242345313;
                        readonly started_at: 1699829921;
                        readonly ended_at: 1699833374;
                        readonly invoice_number: "3000P0085545388";
                        readonly vin: "7SA3CBE6XPF123456";
                        readonly location: "Yuma, AZ - South Fortuna Road";
                        readonly energy_used: 70;
                        readonly idle_minutes: 0;
                        readonly charging_fees: 24.5;
                        readonly idle_fees: 0;
                        readonly total_cost: 24.5;
                        readonly cost_per_kwh: 0.35;
                        readonly currency: "USD";
                        readonly invoice_url: "https://tesla.com/teslaaccount/charging/invoice/f4d990ab-f32f-4965-8f61-6e7603714a41";
                    }, {
                        readonly id: 242281757;
                        readonly started_at: 1699818910;
                        readonly ended_at: 1699821672;
                        readonly invoice_number: "3000P0085503265";
                        readonly vin: "7SA3CBE6XPF123456";
                        readonly location: "Tempe, AZ";
                        readonly energy_used: 72;
                        readonly idle_minutes: 0;
                        readonly charging_fees: 18.72;
                        readonly idle_fees: 0;
                        readonly total_cost: 18.72;
                        readonly cost_per_kwh: 0.26;
                        readonly currency: "USD";
                        readonly invoice_url: "https://tesla.com/teslaaccount/charging/invoice/ae422c93-7e86-43d3-a24f-58f0604a1b06";
                    }];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFleetTelemetryConfig: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly synced: {
                    readonly type: "boolean";
                };
                readonly config: {
                    readonly type: "object";
                    readonly properties: {
                        readonly hostname: {
                            readonly type: "string";
                        };
                        readonly ca: {
                            readonly type: "string";
                        };
                        readonly exp: {
                            readonly type: "integer";
                        };
                        readonly port: {
                            readonly type: "integer";
                        };
                        readonly fields: {
                            readonly type: "object";
                            readonly properties: {};
                        };
                        readonly alert_types: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly update_available: {
                    readonly type: "boolean";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly synced: true;
                    readonly config: {
                        readonly hostname: "telemetry.tessie.com";
                        readonly ca: "...";
                        readonly exp: 1753759258;
                        readonly port: 443;
                        readonly fields: {};
                        readonly alert_types: readonly ["service"];
                    };
                    readonly update_available: false;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetHistoricalStates: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly interval: {
                    readonly type: "number";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The desired number of seconds between data points. Set to 1 to return all data points.";
                };
                readonly condense: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to condense data output.";
                };
                readonly timezone: {
                    readonly type: "string";
                    readonly default: "UTC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IANA timezone name.";
                };
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly temperature_format: {
                    readonly type: "string";
                    readonly default: "c";
                    readonly enum: readonly ["c", "f"];
                    readonly description: "Whether to return data in Fahrenheit or Celsius.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly default: "json";
                    readonly description: "Whether to output the results in JSON or CSV.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly results: {
                        readonly type: "array";
                        readonly items: {
                            readonly description: "The historical state of a vehicle.";
                            readonly type: "object";
                            readonly title: "Historical State";
                            readonly properties: {
                                readonly results: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "number";
                                                readonly examples: readonly [9271676809];
                                            };
                                            readonly timestamp: {
                                                readonly type: "number";
                                                readonly examples: readonly [1644010170];
                                            };
                                            readonly state: {
                                                readonly type: "string";
                                                readonly examples: readonly ["online"];
                                            };
                                            readonly charging_state: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Charging"];
                                            };
                                            readonly shift_state: {
                                                readonly type: "string";
                                                readonly examples: readonly ["P"];
                                            };
                                            readonly version: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2022.4"];
                                            };
                                            readonly battery_level: {
                                                readonly type: "number";
                                                readonly examples: readonly [88];
                                            };
                                            readonly usable_battery_level: {
                                                readonly type: "number";
                                                readonly examples: readonly [88];
                                            };
                                            readonly battery_range: {
                                                readonly type: "number";
                                                readonly examples: readonly [266.69];
                                            };
                                            readonly est_battery_range: {
                                                readonly type: "number";
                                                readonly examples: readonly [221.31];
                                            };
                                            readonly ideal_battery_range: {
                                                readonly type: "number";
                                                readonly examples: readonly [999];
                                            };
                                            readonly latitude: {
                                                readonly type: "number";
                                                readonly examples: readonly [40.7128];
                                            };
                                            readonly longitude: {
                                                readonly type: "number";
                                                readonly examples: readonly [74.006];
                                            };
                                            readonly elevation: {
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly heading: {
                                                readonly type: "number";
                                                readonly examples: readonly [213];
                                            };
                                            readonly speed: {
                                                readonly type: readonly ["number", "null"];
                                            };
                                            readonly power: {
                                                readonly type: readonly ["number", "null"];
                                                readonly examples: readonly [0];
                                            };
                                            readonly odometer: {
                                                readonly type: "number";
                                                readonly examples: readonly [14096.5];
                                            };
                                            readonly charge_rate: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                            readonly charger_actual_current: {
                                                readonly type: "number";
                                                readonly examples: readonly [12];
                                            };
                                            readonly charger_power: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                            readonly charger_phases: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                            readonly charger_voltage: {
                                                readonly type: "number";
                                                readonly examples: readonly [118];
                                            };
                                            readonly charge_miles_added_rated: {
                                                readonly type: "number";
                                                readonly examples: readonly [1.5];
                                            };
                                            readonly charge_miles_added_ideal: {
                                                readonly type: "number";
                                                readonly examples: readonly [422];
                                            };
                                            readonly is_climate_on: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly is_preconditioning: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly battery_heater_on: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly inside_temp: {
                                                readonly type: "number";
                                                readonly examples: readonly [37.7];
                                            };
                                            readonly outside_temp: {
                                                readonly type: "number";
                                                readonly examples: readonly [20.5];
                                            };
                                            readonly left_temp_direction: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly right_temp_direction: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly df: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly dr: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly ft: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly pf: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly pr: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly rt: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly locked: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                            readonly fd_window: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly fp_window: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly rd_window: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly rp_window: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly sentry_mode: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                            readonly valet_mode: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly required: readonly ["id", "timestamp", "state", "charging_state", "shift_state", "version", "battery_level", "usable_battery_level", "battery_range", "est_battery_range", "ideal_battery_range", "latitude", "longitude", "heading", "power", "odometer", "charge_rate", "charger_actual_current", "charger_power", "charger_phases", "charger_voltage", "charge_miles_added_rated", "charge_miles_added_ideal", "is_climate_on", "is_preconditioning", "battery_heater_on", "inside_temp", "outside_temp", "left_temp_direction", "right_temp_direction", "df", "dr", "ft", "pf", "pr", "rt", "locked", "fd_window", "fp_window", "rd_window", "rp_window", "sentry_mode", "valet_mode"];
                                    };
                                };
                            };
                        };
                    };
                };
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly results: {
                        readonly title: "Condensed History States";
                        readonly description: "The historical states of a vehicle in a condensed format.";
                        readonly type: "object";
                        readonly properties: {
                            readonly results: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ids: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [9271676809];
                                            };
                                        };
                                        readonly timestamps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1644010170];
                                            };
                                        };
                                        readonly states: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["online"];
                                            };
                                        };
                                        readonly charging_states: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Charging"];
                                            };
                                        };
                                        readonly shift_states: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["P"];
                                            };
                                        };
                                        readonly versions: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2022.4"];
                                            };
                                        };
                                        readonly battery_levels: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [88];
                                            };
                                        };
                                        readonly usable_battery_levels: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [88];
                                            };
                                        };
                                        readonly battery_ranges: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [266.69];
                                            };
                                        };
                                        readonly est_battery_ranges: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [221.31];
                                            };
                                        };
                                        readonly ideal_battery_ranges: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [999];
                                            };
                                        };
                                        readonly latitudes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [40.7128];
                                            };
                                        };
                                        readonly longitudes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [74.006];
                                            };
                                        };
                                        readonly elevations: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: readonly ["number", "null"];
                                            };
                                        };
                                        readonly headings: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [213];
                                            };
                                        };
                                        readonly speeds: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: readonly ["number", "null"];
                                            };
                                        };
                                        readonly powers: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: readonly ["number", "null"];
                                            };
                                        };
                                        readonly odometers: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [14096.5];
                                            };
                                        };
                                        readonly charge_rates: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                        };
                                        readonly charger_actual_currents: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [12];
                                            };
                                        };
                                        readonly charger_powers: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                        };
                                        readonly charger_phasess: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                        };
                                        readonly charger_voltages: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [118];
                                            };
                                        };
                                        readonly charge_miles_added_rateds: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1.5];
                                            };
                                        };
                                        readonly charge_miles_added_ideals: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [422];
                                            };
                                        };
                                        readonly is_climate_ons: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly is_preconditionings: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly battery_heater_ons: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly inside_temps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [37.7];
                                            };
                                        };
                                        readonly outside_temps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [20.5];
                                            };
                                        };
                                        readonly left_temp_directions: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly right_temp_directions: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly dfs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly drs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly fts: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly pfs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly prs: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly rts: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly lockeds: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [1];
                                            };
                                        };
                                        readonly fd_windows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly fp_windows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly rd_windows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly rp_windows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly sentry_modes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                        readonly valet_modes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "number";
                                                readonly examples: readonly [0];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly type: "object";
            }];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetIdles: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly distance_format: {
                    readonly type: "string";
                    readonly default: "mi";
                    readonly enum: readonly ["mi", "km"];
                    readonly description: "Whether to return data in miles or kilometers.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly format: {
                    readonly type: "string";
                    readonly enum: readonly ["json", "csv"];
                    readonly default: "json";
                    readonly description: "Whether to output the results in JSON or CSV.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly timezone: {
                    readonly type: "string";
                    readonly default: "UTC";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The IANA timezone name.";
                };
                readonly from: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The start of the timeframe. Unix timestamp in seconds.";
                };
                readonly to: {
                    readonly type: "number";
                    readonly examples: readonly [1643747642];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the timeframe. Unix timestamp in seconds.";
                };
                readonly origin_latitude: {
                    readonly type: "number";
                    readonly examples: readonly [37.4925];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The latitude of the parking spot.";
                };
                readonly origin_longitude: {
                    readonly type: "number";
                    readonly examples: readonly [121.9447];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The longitude of the parking spot.";
                };
                readonly origin_radius: {
                    readonly type: "number";
                    readonly examples: readonly [80];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The radius from the parking spot, in meters.";
                };
                readonly exclude_origin: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include the parking spot.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "";
                        readonly type: "object";
                        readonly title: "Idle";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                            };
                            readonly started_at: {
                                readonly type: "number";
                            };
                            readonly ended_at: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "string";
                            };
                            readonly latitude: {
                                readonly type: "number";
                            };
                            readonly longitude: {
                                readonly type: "number";
                            };
                            readonly starting_battery: {
                                readonly type: "number";
                            };
                            readonly ending_battery: {
                                readonly type: "number";
                            };
                            readonly rated_range_used: {
                                readonly type: "number";
                            };
                            readonly climate_fraction: {
                                readonly type: "number";
                            };
                            readonly sentry_fraction: {
                                readonly type: "number";
                            };
                            readonly energy_used: {
                                readonly type: "number";
                            };
                        };
                        readonly required: readonly ["id", "started_at", "ended_at", "location", "latitude", "longitude", "starting_battery", "ending_battery", "rated_range_used", "climate_fraction", "sentry_fraction", "energy_used"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetInvitations: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly Example: {
                    readonly results: readonly [{
                        readonly id: 2252266471835111;
                        readonly owner_id: 1234567;
                        readonly share_user_id: any;
                        readonly product_id: "7SAXCBE6XPF123456";
                        readonly state: "pending";
                        readonly code: "asdZ0FG_yuioQ7OoVx1_e5-asdft83MqxT7BY8DsaeCs";
                        readonly expires_at: "2023-11-29T00:55:31.000Z";
                        readonly revoked_at: any;
                        readonly borrowing_device_id: any;
                        readonly key_id: any;
                        readonly product_type: "vehicle";
                        readonly share_type: "customer";
                        readonly active_pubkeys: readonly [any];
                        readonly id_s: "2252266471835111";
                        readonly owner_id_s: "1234567";
                        readonly share_user_id_s: "";
                        readonly borrowing_key_hash: any;
                        readonly vin: "7SAXCBE6XPF123456";
                        readonly share_link: "https://www.tesla.com/_rs/1/asdZ0FG_yuioQ7OoVx1_e5-asdft83MqxT7BY8DsaeCs";
                    }, {
                        readonly id: 2252270843114112;
                        readonly owner_id: 1234567;
                        readonly share_user_id: any;
                        readonly product_id: "7SAXCBE6XPF123456";
                        readonly state: "pending";
                        readonly code: "asd7Qqpxlq6-kKZ2Aasdfw3oCp_yuioYJnQsYYB2jL3w";
                        readonly expires_at: "2023-11-29T00:55:18.000Z";
                        readonly revoked_at: any;
                        readonly borrowing_device_id: any;
                        readonly key_id: any;
                        readonly product_type: "vehicle";
                        readonly share_type: "customer";
                        readonly active_pubkeys: readonly [any];
                        readonly id_s: "2252270843114112";
                        readonly owner_id_s: "1234567";
                        readonly share_user_id_s: "";
                        readonly borrowing_key_hash: any;
                        readonly vin: "7SAXCBE6XPF123456";
                        readonly share_link: "https://www.tesla.com/_rs/1/asd7Qqpxlq6-kKZ2Aasdfw3oCp_yuioYJnQsYYB2jL3w";
                    }];
                };
            };
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly owner_id: {
                                readonly type: "integer";
                            };
                            readonly product_id: {
                                readonly type: "string";
                            };
                            readonly share_user_id: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly state: {
                                readonly type: "string";
                            };
                            readonly code: {
                                readonly type: "string";
                            };
                            readonly expires_at: {
                                readonly type: "string";
                            };
                            readonly revoked_at: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly borrowing_device_id: {
                                readonly type: readonly ["integer", "null"];
                            };
                            readonly key_id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly product_type: {
                                readonly type: "string";
                            };
                            readonly share_type: {
                                readonly type: "string";
                            };
                            readonly active_pubkeys: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly id_s: {
                                readonly type: "string";
                            };
                            readonly owner_id_s: {
                                readonly type: "string";
                            };
                            readonly share_user_id_s: {
                                readonly type: "string";
                            };
                            readonly borrowing_key_hash: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly vin: {
                                readonly type: "string";
                            };
                            readonly share_link: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLastIdleState: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly battery_level: {
                            readonly type: "integer";
                        };
                        readonly usable_battery_level: {
                            readonly type: "integer";
                        };
                        readonly battery_range: {
                            readonly type: "number";
                        };
                        readonly est_battery_range: {
                            readonly type: "number";
                        };
                        readonly ideal_battery_range: {
                            readonly type: "integer";
                        };
                    };
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly result: {
                        readonly timestamp: 1675173627;
                        readonly battery_level: 68;
                        readonly usable_battery_level: 68;
                        readonly battery_range: 204.96;
                        readonly est_battery_range: 165.47;
                        readonly ideal_battery_range: 999;
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLocation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly latitude: {
                    readonly type: "number";
                };
                readonly longitude: {
                    readonly type: "number";
                };
                readonly address: {
                    readonly type: "string";
                };
                readonly saved_location: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMap: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly width: {
                    readonly type: "integer";
                    readonly default: 300;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The map's width.";
                };
                readonly height: {
                    readonly type: "integer";
                    readonly default: 300;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The map's height.";
                };
                readonly zoom: {
                    readonly type: "integer";
                    readonly default: 13;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The map's zoom level.";
                };
                readonly marker_size: {
                    readonly type: "integer";
                    readonly default: 75;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The size of the vehicle marker. Set to 0 to hide the marker.";
                };
                readonly style: {
                    readonly type: "string";
                    readonly enum: readonly ["light", "dark"];
                    readonly default: "light";
                    readonly description: "The map's style.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetPlate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly Example: {
                    readonly result: "ZOOMZOOM";
                };
            };
            readonly properties: {
                readonly result: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetState: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly use_cache: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to return the most recently seen data. Set to false to retrieve the vehicle state in real-time. If true, doesn't impact vehicle sleep and always returns a complete set of data.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                };
                readonly vin: {
                    readonly type: "string";
                };
                readonly id_s: {
                    readonly type: "string";
                };
                readonly color: {
                    readonly type: "string";
                };
                readonly state: {
                    readonly type: "string";
                };
                readonly user_id: {
                    readonly type: "integer";
                };
                readonly in_service: {
                    readonly type: "boolean";
                };
                readonly vehicle_id: {
                    readonly type: "integer";
                };
                readonly access_type: {
                    readonly type: "string";
                };
                readonly api_version: {
                    readonly type: "integer";
                };
                readonly drive_state: {
                    readonly type: "object";
                    readonly properties: {
                        readonly power: {
                            readonly type: "integer";
                        };
                        readonly speed: {
                            readonly type: "string";
                        };
                        readonly heading: {
                            readonly type: "integer";
                        };
                        readonly latitude: {
                            readonly type: "number";
                        };
                        readonly gps_as_of: {
                            readonly type: "integer";
                        };
                        readonly longitude: {
                            readonly type: "number";
                        };
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly native_type: {
                            readonly type: "string";
                        };
                        readonly shift_state: {
                            readonly type: "string";
                        };
                        readonly native_latitude: {
                            readonly type: "number";
                        };
                        readonly native_longitude: {
                            readonly type: "number";
                        };
                        readonly native_location_supported: {
                            readonly type: "integer";
                        };
                        readonly active_route_destination: {
                            readonly type: "string";
                        };
                        readonly active_route_energy_at_arrival: {
                            readonly type: "integer";
                        };
                        readonly active_route_latitude: {
                            readonly type: "number";
                        };
                        readonly active_route_longitude: {
                            readonly type: "number";
                        };
                        readonly active_route_miles_to_arrival: {
                            readonly type: "number";
                        };
                        readonly active_route_minutes_to_arrival: {
                            readonly type: "number";
                        };
                        readonly active_route_traffic_minutes_delay: {
                            readonly type: "integer";
                        };
                    };
                };
                readonly charge_state: {
                    readonly type: "object";
                    readonly properties: {
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly charge_amps: {
                            readonly type: "integer";
                        };
                        readonly charge_rate: {
                            readonly type: "integer";
                        };
                        readonly battery_level: {
                            readonly type: "integer";
                        };
                        readonly battery_range: {
                            readonly type: "number";
                        };
                        readonly charger_power: {
                            readonly type: "integer";
                        };
                        readonly trip_charging: {
                            readonly type: "boolean";
                        };
                        readonly charger_phases: {
                            readonly type: "string";
                        };
                        readonly charging_state: {
                            readonly type: "string";
                        };
                        readonly charger_voltage: {
                            readonly type: "integer";
                        };
                        readonly charge_limit_soc: {
                            readonly type: "integer";
                        };
                        readonly battery_heater_on: {
                            readonly type: "boolean";
                        };
                        readonly charge_port_color: {
                            readonly type: "string";
                        };
                        readonly charge_port_latch: {
                            readonly type: "string";
                        };
                        readonly conn_charge_cable: {
                            readonly type: "string";
                        };
                        readonly est_battery_range: {
                            readonly type: "number";
                        };
                        readonly fast_charger_type: {
                            readonly type: "string";
                        };
                        readonly fast_charger_brand: {
                            readonly type: "string";
                        };
                        readonly charge_energy_added: {
                            readonly type: "number";
                        };
                        readonly charge_to_max_range: {
                            readonly type: "boolean";
                        };
                        readonly ideal_battery_range: {
                            readonly type: "integer";
                        };
                        readonly time_to_full_charge: {
                            readonly type: "integer";
                        };
                        readonly charge_limit_soc_max: {
                            readonly type: "integer";
                        };
                        readonly charge_limit_soc_min: {
                            readonly type: "integer";
                        };
                        readonly charge_limit_soc_std: {
                            readonly type: "integer";
                        };
                        readonly fast_charger_present: {
                            readonly type: "boolean";
                        };
                        readonly usable_battery_level: {
                            readonly type: "integer";
                        };
                        readonly charge_enable_request: {
                            readonly type: "boolean";
                        };
                        readonly charge_port_door_open: {
                            readonly type: "boolean";
                        };
                        readonly charger_pilot_current: {
                            readonly type: "integer";
                        };
                        readonly preconditioning_times: {
                            readonly type: "string";
                        };
                        readonly charge_current_request: {
                            readonly type: "integer";
                        };
                        readonly charger_actual_current: {
                            readonly type: "integer";
                        };
                        readonly minutes_to_full_charge: {
                            readonly type: "integer";
                        };
                        readonly managed_charging_active: {
                            readonly type: "boolean";
                        };
                        readonly off_peak_charging_times: {
                            readonly type: "string";
                        };
                        readonly off_peak_hours_end_time: {
                            readonly type: "integer";
                        };
                        readonly preconditioning_enabled: {
                            readonly type: "boolean";
                        };
                        readonly scheduled_charging_mode: {
                            readonly type: "string";
                        };
                        readonly charge_miles_added_ideal: {
                            readonly type: "integer";
                        };
                        readonly charge_miles_added_rated: {
                            readonly type: "number";
                        };
                        readonly max_range_charge_counter: {
                            readonly type: "integer";
                        };
                        readonly not_enough_power_to_heat: {
                            readonly type: "boolean";
                        };
                        readonly scheduled_departure_time: {
                            readonly type: "integer";
                        };
                        readonly off_peak_charging_enabled: {
                            readonly type: "boolean";
                        };
                        readonly charge_current_request_max: {
                            readonly type: "integer";
                        };
                        readonly scheduled_charging_pending: {
                            readonly type: "boolean";
                        };
                        readonly user_charge_enable_request: {
                            readonly type: "string";
                        };
                        readonly managed_charging_start_time: {
                            readonly type: "string";
                        };
                        readonly charge_port_cold_weather_mode: {
                            readonly type: "string";
                        };
                        readonly scheduled_charging_start_time: {
                            readonly type: "string";
                        };
                        readonly managed_charging_user_canceled: {
                            readonly type: "boolean";
                        };
                        readonly scheduled_departure_time_minutes: {
                            readonly type: "integer";
                        };
                        readonly scheduled_charging_start_time_app: {
                            readonly type: "integer";
                        };
                        readonly supercharger_session_trip_planner: {
                            readonly type: "boolean";
                        };
                        readonly pack_current: {
                            readonly type: "number";
                        };
                        readonly pack_voltage: {
                            readonly type: "number";
                        };
                        readonly module_temp_min: {
                            readonly type: "number";
                        };
                        readonly module_temp_max: {
                            readonly type: "integer";
                        };
                        readonly energy_remaining: {
                            readonly type: "number";
                        };
                        readonly lifetime_energy_used: {
                            readonly type: "number";
                        };
                    };
                };
                readonly display_name: {
                    readonly type: "string";
                };
                readonly gui_settings: {
                    readonly type: "object";
                    readonly properties: {
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly gui_24_hour_time: {
                            readonly type: "boolean";
                        };
                        readonly show_range_units: {
                            readonly type: "boolean";
                        };
                        readonly gui_range_display: {
                            readonly type: "string";
                        };
                        readonly gui_distance_units: {
                            readonly type: "string";
                        };
                        readonly gui_charge_rate_units: {
                            readonly type: "string";
                        };
                        readonly gui_temperature_units: {
                            readonly type: "string";
                        };
                    };
                };
                readonly option_codes: {
                    readonly type: "string";
                };
                readonly climate_state: {
                    readonly type: "object";
                    readonly properties: {
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly fan_status: {
                            readonly type: "integer";
                        };
                        readonly inside_temp: {
                            readonly type: "number";
                        };
                        readonly defrost_mode: {
                            readonly type: "integer";
                        };
                        readonly outside_temp: {
                            readonly type: "number";
                        };
                        readonly is_climate_on: {
                            readonly type: "boolean";
                        };
                        readonly battery_heater: {
                            readonly type: "boolean";
                        };
                        readonly bioweapon_mode: {
                            readonly type: "boolean";
                        };
                        readonly max_avail_temp: {
                            readonly type: "integer";
                        };
                        readonly min_avail_temp: {
                            readonly type: "integer";
                        };
                        readonly seat_heater_left: {
                            readonly type: "integer";
                        };
                        readonly hvac_auto_request: {
                            readonly type: "string";
                        };
                        readonly seat_heater_right: {
                            readonly type: "integer";
                        };
                        readonly is_preconditioning: {
                            readonly type: "boolean";
                        };
                        readonly wiper_blade_heater: {
                            readonly type: "boolean";
                        };
                        readonly climate_keeper_mode: {
                            readonly type: "string";
                        };
                        readonly driver_temp_setting: {
                            readonly type: "number";
                        };
                        readonly left_temp_direction: {
                            readonly type: "integer";
                        };
                        readonly side_mirror_heaters: {
                            readonly type: "boolean";
                        };
                        readonly is_rear_defroster_on: {
                            readonly type: "boolean";
                        };
                        readonly right_temp_direction: {
                            readonly type: "integer";
                        };
                        readonly is_front_defroster_on: {
                            readonly type: "boolean";
                        };
                        readonly seat_heater_rear_left: {
                            readonly type: "integer";
                        };
                        readonly steering_wheel_heater: {
                            readonly type: "boolean";
                        };
                        readonly passenger_temp_setting: {
                            readonly type: "number";
                        };
                        readonly seat_heater_rear_right: {
                            readonly type: "integer";
                        };
                        readonly battery_heater_no_power: {
                            readonly type: "boolean";
                        };
                        readonly is_auto_conditioning_on: {
                            readonly type: "boolean";
                        };
                        readonly seat_heater_rear_center: {
                            readonly type: "integer";
                        };
                        readonly cabin_overheat_protection: {
                            readonly type: "string";
                        };
                        readonly seat_heater_third_row_left: {
                            readonly type: "integer";
                        };
                        readonly seat_heater_third_row_right: {
                            readonly type: "integer";
                        };
                        readonly remote_heater_control_enabled: {
                            readonly type: "boolean";
                        };
                        readonly allow_cabin_overheat_protection: {
                            readonly type: "boolean";
                        };
                        readonly supports_fan_only_cabin_overheat_protection: {
                            readonly type: "boolean";
                        };
                    };
                };
                readonly vehicle_state: {
                    readonly type: "object";
                    readonly properties: {
                        readonly df: {
                            readonly type: "integer";
                        };
                        readonly dr: {
                            readonly type: "integer";
                        };
                        readonly ft: {
                            readonly type: "integer";
                        };
                        readonly pf: {
                            readonly type: "integer";
                        };
                        readonly pr: {
                            readonly type: "integer";
                        };
                        readonly rt: {
                            readonly type: "integer";
                        };
                        readonly locked: {
                            readonly type: "boolean";
                        };
                        readonly odometer: {
                            readonly type: "number";
                        };
                        readonly fd_window: {
                            readonly type: "integer";
                        };
                        readonly fp_window: {
                            readonly type: "integer";
                        };
                        readonly rd_window: {
                            readonly type: "integer";
                        };
                        readonly rp_window: {
                            readonly type: "integer";
                        };
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly santa_mode: {
                            readonly type: "integer";
                        };
                        readonly valet_mode: {
                            readonly type: "boolean";
                        };
                        readonly api_version: {
                            readonly type: "integer";
                        };
                        readonly car_version: {
                            readonly type: "string";
                        };
                        readonly media_state: {
                            readonly type: "object";
                            readonly properties: {
                                readonly remote_control_enabled: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly sentry_mode: {
                            readonly type: "boolean";
                        };
                        readonly remote_start: {
                            readonly type: "boolean";
                        };
                        readonly vehicle_name: {
                            readonly type: "string";
                        };
                        readonly dashcam_state: {
                            readonly type: "string";
                        };
                        readonly autopark_style: {
                            readonly type: "string";
                        };
                        readonly homelink_nearby: {
                            readonly type: "boolean";
                        };
                        readonly is_user_present: {
                            readonly type: "boolean";
                        };
                        readonly software_update: {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                };
                                readonly version: {
                                    readonly type: "string";
                                };
                                readonly install_perc: {
                                    readonly type: "integer";
                                };
                                readonly download_perc: {
                                    readonly type: "integer";
                                };
                                readonly expected_duration_sec: {
                                    readonly type: "integer";
                                };
                            };
                        };
                        readonly speed_limit_mode: {
                            readonly type: "object";
                            readonly properties: {
                                readonly active: {
                                    readonly type: "boolean";
                                };
                                readonly pin_code_set: {
                                    readonly type: "boolean";
                                };
                                readonly max_limit_mph: {
                                    readonly type: "integer";
                                };
                                readonly min_limit_mph: {
                                    readonly type: "integer";
                                };
                                readonly current_limit_mph: {
                                    readonly type: "integer";
                                };
                            };
                        };
                        readonly tpms_pressure_fl: {
                            readonly type: "string";
                        };
                        readonly tpms_pressure_fr: {
                            readonly type: "string";
                        };
                        readonly tpms_pressure_rl: {
                            readonly type: "string";
                        };
                        readonly tpms_pressure_rr: {
                            readonly type: "string";
                        };
                        readonly autopark_state_v2: {
                            readonly type: "string";
                        };
                        readonly calendar_supported: {
                            readonly type: "boolean";
                        };
                        readonly last_autopark_error: {
                            readonly type: "string";
                        };
                        readonly center_display_state: {
                            readonly type: "integer";
                        };
                        readonly remote_start_enabled: {
                            readonly type: "boolean";
                        };
                        readonly homelink_device_count: {
                            readonly type: "integer";
                        };
                        readonly sentry_mode_available: {
                            readonly type: "boolean";
                        };
                        readonly remote_start_supported: {
                            readonly type: "boolean";
                        };
                        readonly smart_summon_available: {
                            readonly type: "boolean";
                        };
                        readonly notifications_supported: {
                            readonly type: "boolean";
                        };
                        readonly parsed_calendar_supported: {
                            readonly type: "boolean";
                        };
                        readonly dashcam_clip_save_available: {
                            readonly type: "boolean";
                        };
                        readonly summon_standby_mode_enabled: {
                            readonly type: "boolean";
                        };
                    };
                };
                readonly backseat_token: {
                    readonly type: "string";
                };
                readonly vehicle_config: {
                    readonly type: "object";
                    readonly properties: {
                        readonly plg: {
                            readonly type: "boolean";
                        };
                        readonly pws: {
                            readonly type: "boolean";
                        };
                        readonly rhd: {
                            readonly type: "boolean";
                        };
                        readonly car_type: {
                            readonly type: "string";
                        };
                        readonly seat_type: {
                            readonly type: "integer";
                        };
                        readonly timestamp: {
                            readonly type: "integer";
                        };
                        readonly eu_vehicle: {
                            readonly type: "boolean";
                        };
                        readonly roof_color: {
                            readonly type: "string";
                        };
                        readonly utc_offset: {
                            readonly type: "integer";
                        };
                        readonly wheel_type: {
                            readonly type: "string";
                        };
                        readonly spoiler_type: {
                            readonly type: "string";
                        };
                        readonly trim_badging: {
                            readonly type: "string";
                        };
                        readonly driver_assist: {
                            readonly type: "string";
                        };
                        readonly headlamp_type: {
                            readonly type: "string";
                        };
                        readonly exterior_color: {
                            readonly type: "string";
                        };
                        readonly rear_seat_type: {
                            readonly type: "integer";
                        };
                        readonly rear_drive_unit: {
                            readonly type: "string";
                        };
                        readonly third_row_seats: {
                            readonly type: "string";
                        };
                        readonly car_special_type: {
                            readonly type: "string";
                        };
                        readonly charge_port_type: {
                            readonly type: "string";
                        };
                        readonly ece_restrictions: {
                            readonly type: "boolean";
                        };
                        readonly front_drive_unit: {
                            readonly type: "string";
                        };
                        readonly has_seat_cooling: {
                            readonly type: "boolean";
                        };
                        readonly rear_seat_heaters: {
                            readonly type: "integer";
                        };
                        readonly use_range_badging: {
                            readonly type: "boolean";
                        };
                        readonly can_actuate_trunks: {
                            readonly type: "boolean";
                        };
                        readonly efficiency_package: {
                            readonly type: "string";
                        };
                        readonly has_air_suspension: {
                            readonly type: "boolean";
                        };
                        readonly has_ludicrous_mode: {
                            readonly type: "boolean";
                        };
                        readonly interior_trim_type: {
                            readonly type: "string";
                        };
                        readonly sun_roof_installed: {
                            readonly type: "integer";
                        };
                        readonly default_charge_to_max: {
                            readonly type: "boolean";
                        };
                        readonly motorized_charge_port: {
                            readonly type: "boolean";
                        };
                        readonly dashcam_clip_save_supported: {
                            readonly type: "boolean";
                        };
                        readonly can_accept_navigation_requests: {
                            readonly type: "boolean";
                        };
                    };
                };
                readonly calendar_enabled: {
                    readonly type: "boolean";
                };
                readonly backseat_token_updated_at: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly id: 1492931520123456;
                    readonly vin: "5YJXCAE43LF123456";
                    readonly id_s: "1492931520123456";
                    readonly color: "string";
                    readonly state: "online";
                    readonly user_id: 1311857;
                    readonly in_service: true;
                    readonly vehicle_id: 1349238573;
                    readonly access_type: "OWNER";
                    readonly api_version: 34;
                    readonly drive_state: {
                        readonly power: 0;
                        readonly speed: "string";
                        readonly heading: 194;
                        readonly latitude: 40.7484;
                        readonly gps_as_of: 1643590638;
                        readonly longitude: 73.9857;
                        readonly timestamp: 1643590652755;
                        readonly native_type: "wgs";
                        readonly shift_state: "P";
                        readonly native_latitude: 40.7484;
                        readonly native_longitude: 73.9857;
                        readonly native_location_supported: 1;
                        readonly active_route_destination: "Empire State Building";
                        readonly active_route_energy_at_arrival: 81;
                        readonly active_route_latitude: -1.123456;
                        readonly active_route_longitude: 1.123456;
                        readonly active_route_miles_to_arrival: 4.12;
                        readonly active_route_minutes_to_arrival: 5.43;
                        readonly active_route_traffic_minutes_delay: 0;
                    };
                    readonly charge_state: {
                        readonly timestamp: 1643590652755;
                        readonly charge_amps: 12;
                        readonly charge_rate: 0;
                        readonly battery_level: 89;
                        readonly battery_range: 269.01;
                        readonly charger_power: 0;
                        readonly trip_charging: true;
                        readonly charger_phases: "string";
                        readonly charging_state: "Complete";
                        readonly charger_voltage: 0;
                        readonly charge_limit_soc: 90;
                        readonly battery_heater_on: true;
                        readonly charge_port_color: "Off";
                        readonly charge_port_latch: "Engaged";
                        readonly conn_charge_cable: "SAE";
                        readonly est_battery_range: 223.25;
                        readonly fast_charger_type: "MCSingleWireCAN";
                        readonly fast_charger_brand: "<invalid>";
                        readonly charge_energy_added: 4.64;
                        readonly charge_to_max_range: true;
                        readonly ideal_battery_range: 999;
                        readonly time_to_full_charge: 0;
                        readonly charge_limit_soc_max: 100;
                        readonly charge_limit_soc_min: 50;
                        readonly charge_limit_soc_std: 90;
                        readonly fast_charger_present: true;
                        readonly usable_battery_level: 89;
                        readonly charge_enable_request: true;
                        readonly charge_port_door_open: true;
                        readonly charger_pilot_current: 12;
                        readonly preconditioning_times: "weekdays";
                        readonly charge_current_request: 12;
                        readonly charger_actual_current: 0;
                        readonly minutes_to_full_charge: 0;
                        readonly managed_charging_active: true;
                        readonly off_peak_charging_times: "all_week";
                        readonly off_peak_hours_end_time: 375;
                        readonly preconditioning_enabled: true;
                        readonly scheduled_charging_mode: "Off";
                        readonly charge_miles_added_ideal: 4641;
                        readonly charge_miles_added_rated: 14.5;
                        readonly max_range_charge_counter: 0;
                        readonly not_enough_power_to_heat: true;
                        readonly scheduled_departure_time: 1643578200;
                        readonly off_peak_charging_enabled: true;
                        readonly charge_current_request_max: 12;
                        readonly scheduled_charging_pending: true;
                        readonly user_charge_enable_request: "string";
                        readonly managed_charging_start_time: "string";
                        readonly charge_port_cold_weather_mode: "string";
                        readonly scheduled_charging_start_time: "string";
                        readonly managed_charging_user_canceled: true;
                        readonly scheduled_departure_time_minutes: 810;
                        readonly scheduled_charging_start_time_app: 817;
                        readonly supercharger_session_trip_planner: true;
                        readonly pack_current: -0.7;
                        readonly pack_voltage: 419.79;
                        readonly module_temp_min: 25.5;
                        readonly module_temp_max: 26;
                        readonly energy_remaining: 51.26;
                        readonly lifetime_energy_used: 5224.713;
                    };
                    readonly display_name: "Seneca";
                    readonly gui_settings: {
                        readonly timestamp: 1643590652755;
                        readonly gui_24_hour_time: true;
                        readonly show_range_units: true;
                        readonly gui_range_display: "Rated";
                        readonly gui_distance_units: "mi/hr";
                        readonly gui_charge_rate_units: "kW";
                        readonly gui_temperature_units: "F";
                    };
                    readonly option_codes: "AD15MDL3PBSBRENABT37ID3WRF3GS3PBDRLHDV2WW39BAPF0COUSBC3BCH07PC30FC3PFG31GLFRHL31HM31IL31LTPBMR31FM3BRS3HSA3PSTCPSC04SU3CT3CATW00TM00UT3PWR00AU3PAPH3AF00ZCSTMI00CDM0";
                    readonly climate_state: {
                        readonly timestamp: 1643590652755;
                        readonly fan_status: 0;
                        readonly inside_temp: 24.3;
                        readonly defrost_mode: 0;
                        readonly outside_temp: 17.5;
                        readonly is_climate_on: true;
                        readonly battery_heater: true;
                        readonly bioweapon_mode: true;
                        readonly max_avail_temp: 28;
                        readonly min_avail_temp: 15;
                        readonly seat_heater_left: 0;
                        readonly hvac_auto_request: "On";
                        readonly seat_heater_right: 0;
                        readonly is_preconditioning: true;
                        readonly wiper_blade_heater: true;
                        readonly climate_keeper_mode: "off";
                        readonly driver_temp_setting: 22.8;
                        readonly left_temp_direction: 0;
                        readonly side_mirror_heaters: true;
                        readonly is_rear_defroster_on: true;
                        readonly right_temp_direction: 0;
                        readonly is_front_defroster_on: true;
                        readonly seat_heater_rear_left: 0;
                        readonly steering_wheel_heater: true;
                        readonly passenger_temp_setting: 22.8;
                        readonly seat_heater_rear_right: 0;
                        readonly battery_heater_no_power: true;
                        readonly is_auto_conditioning_on: true;
                        readonly seat_heater_rear_center: 0;
                        readonly cabin_overheat_protection: "On";
                        readonly seat_heater_third_row_left: 0;
                        readonly seat_heater_third_row_right: 0;
                        readonly remote_heater_control_enabled: true;
                        readonly allow_cabin_overheat_protection: true;
                        readonly supports_fan_only_cabin_overheat_protection: true;
                    };
                    readonly vehicle_state: {
                        readonly df: 0;
                        readonly dr: 0;
                        readonly ft: 0;
                        readonly pf: 0;
                        readonly pr: 0;
                        readonly rt: 0;
                        readonly locked: true;
                        readonly odometer: 14096.485641;
                        readonly fd_window: 0;
                        readonly fp_window: 0;
                        readonly rd_window: 0;
                        readonly rp_window: 0;
                        readonly timestamp: 1643590652755;
                        readonly santa_mode: 0;
                        readonly valet_mode: true;
                        readonly api_version: 34;
                        readonly car_version: "2022.4 fae2af490933";
                        readonly media_state: {
                            readonly remote_control_enabled: true;
                        };
                        readonly sentry_mode: true;
                        readonly remote_start: true;
                        readonly vehicle_name: "Seneca";
                        readonly dashcam_state: "Unavailable";
                        readonly autopark_style: "standard";
                        readonly homelink_nearby: true;
                        readonly is_user_present: true;
                        readonly software_update: {
                            readonly status: "available";
                            readonly version: "2022.4";
                            readonly install_perc: 1;
                            readonly download_perc: 0;
                            readonly expected_duration_sec: 2700;
                        };
                        readonly speed_limit_mode: {
                            readonly active: true;
                            readonly pin_code_set: true;
                            readonly max_limit_mph: 90;
                            readonly min_limit_mph: 50;
                            readonly current_limit_mph: 84;
                        };
                        readonly tpms_pressure_fl: "string";
                        readonly tpms_pressure_fr: "string";
                        readonly tpms_pressure_rl: "string";
                        readonly tpms_pressure_rr: "string";
                        readonly autopark_state_v2: "standby";
                        readonly calendar_supported: true;
                        readonly last_autopark_error: "no_error";
                        readonly center_display_state: 0;
                        readonly remote_start_enabled: true;
                        readonly homelink_device_count: 0;
                        readonly sentry_mode_available: true;
                        readonly remote_start_supported: true;
                        readonly smart_summon_available: true;
                        readonly notifications_supported: true;
                        readonly parsed_calendar_supported: true;
                        readonly dashcam_clip_save_available: true;
                        readonly summon_standby_mode_enabled: true;
                    };
                    readonly backseat_token: "string";
                    readonly vehicle_config: {
                        readonly plg: true;
                        readonly pws: true;
                        readonly rhd: true;
                        readonly car_type: "modelx";
                        readonly seat_type: 0;
                        readonly timestamp: 1643590652755;
                        readonly eu_vehicle: true;
                        readonly roof_color: "None";
                        readonly utc_offset: -28800;
                        readonly wheel_type: "Turbine22Dark";
                        readonly spoiler_type: "Passive";
                        readonly trim_badging: "p100d";
                        readonly driver_assist: "TeslaAP3";
                        readonly headlamp_type: "Led";
                        readonly exterior_color: "Pearl";
                        readonly rear_seat_type: 7;
                        readonly rear_drive_unit: "Large";
                        readonly third_row_seats: "FuturisFoldFlat";
                        readonly car_special_type: "base";
                        readonly charge_port_type: "US";
                        readonly ece_restrictions: true;
                        readonly front_drive_unit: "PermanentMagnet";
                        readonly has_seat_cooling: true;
                        readonly rear_seat_heaters: 3;
                        readonly use_range_badging: true;
                        readonly can_actuate_trunks: true;
                        readonly efficiency_package: "Default";
                        readonly has_air_suspension: true;
                        readonly has_ludicrous_mode: true;
                        readonly interior_trim_type: "AllBlack";
                        readonly sun_roof_installed: 0;
                        readonly default_charge_to_max: true;
                        readonly motorized_charge_port: true;
                        readonly dashcam_clip_save_supported: true;
                        readonly can_accept_navigation_requests: true;
                    };
                    readonly calendar_enabled: true;
                    readonly backseat_token_updated_at: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStatus: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["asleep", "waiting_for_sleep", "awake"];
                    readonly examples: readonly ["asleep"];
                    readonly description: "`asleep` `waiting_for_sleep` `awake`";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTirePressure: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly front_left: {
                    readonly type: "number";
                };
                readonly front_right: {
                    readonly type: "number";
                };
                readonly rear_left: {
                    readonly type: "number";
                };
                readonly rear_right: {
                    readonly type: "number";
                };
                readonly front_left_status: {
                    readonly type: "string";
                    readonly enum: readonly ["unknown", "low", "normal"];
                    readonly description: "`unknown` `low` `normal`";
                };
                readonly front_right_status: {
                    readonly type: "string";
                    readonly enum: readonly ["unknown", "low", "normal"];
                    readonly description: "`unknown` `low` `normal`";
                };
                readonly rear_left_status: {
                    readonly type: "string";
                    readonly enum: readonly ["unknown", "low", "normal"];
                    readonly description: "`unknown` `low` `normal`";
                };
                readonly rear_right_status: {
                    readonly type: "string";
                    readonly enum: readonly ["unknown", "low", "normal"];
                    readonly description: "`unknown` `low` `normal`";
                };
                readonly timestamp: {
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetVehicles: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly only_active: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to include only active vehicles in the response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly vin: {
                                readonly type: "string";
                            };
                            readonly is_active: {
                                readonly type: "boolean";
                            };
                            readonly last_state: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                    };
                                    readonly vin: {
                                        readonly type: "string";
                                    };
                                    readonly id_s: {
                                        readonly type: "string";
                                    };
                                    readonly color: {
                                        readonly type: "string";
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                    };
                                    readonly user_id: {
                                        readonly type: "integer";
                                    };
                                    readonly in_service: {
                                        readonly type: "boolean";
                                    };
                                    readonly vehicle_id: {
                                        readonly type: "integer";
                                    };
                                    readonly access_type: {
                                        readonly type: "string";
                                    };
                                    readonly api_version: {
                                        readonly type: "integer";
                                    };
                                    readonly drive_state: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly power: {
                                                readonly type: "integer";
                                            };
                                            readonly speed: {
                                                readonly type: "string";
                                            };
                                            readonly heading: {
                                                readonly type: "integer";
                                            };
                                            readonly latitude: {
                                                readonly type: "number";
                                            };
                                            readonly gps_as_of: {
                                                readonly type: "integer";
                                            };
                                            readonly longitude: {
                                                readonly type: "number";
                                            };
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly native_type: {
                                                readonly type: "string";
                                            };
                                            readonly shift_state: {
                                                readonly type: "string";
                                            };
                                            readonly native_latitude: {
                                                readonly type: "number";
                                            };
                                            readonly native_longitude: {
                                                readonly type: "number";
                                            };
                                            readonly native_location_supported: {
                                                readonly type: "integer";
                                            };
                                            readonly active_route_destination: {
                                                readonly type: "string";
                                            };
                                            readonly active_route_energy_at_arrival: {
                                                readonly type: "integer";
                                            };
                                            readonly active_route_latitude: {
                                                readonly type: "number";
                                            };
                                            readonly active_route_longitude: {
                                                readonly type: "number";
                                            };
                                            readonly active_route_miles_to_arrival: {
                                                readonly type: "number";
                                            };
                                            readonly active_route_minutes_to_arrival: {
                                                readonly type: "number";
                                            };
                                            readonly active_route_traffic_minutes_delay: {
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly charge_state: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_amps: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_rate: {
                                                readonly type: "integer";
                                            };
                                            readonly battery_level: {
                                                readonly type: "integer";
                                            };
                                            readonly battery_range: {
                                                readonly type: "number";
                                            };
                                            readonly charger_power: {
                                                readonly type: "integer";
                                            };
                                            readonly trip_charging: {
                                                readonly type: "boolean";
                                            };
                                            readonly charger_phases: {
                                                readonly type: "string";
                                            };
                                            readonly charging_state: {
                                                readonly type: "string";
                                            };
                                            readonly charger_voltage: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_limit_soc: {
                                                readonly type: "integer";
                                            };
                                            readonly battery_heater_on: {
                                                readonly type: "boolean";
                                            };
                                            readonly charge_port_color: {
                                                readonly type: "string";
                                            };
                                            readonly charge_port_latch: {
                                                readonly type: "string";
                                            };
                                            readonly conn_charge_cable: {
                                                readonly type: "string";
                                            };
                                            readonly est_battery_range: {
                                                readonly type: "number";
                                            };
                                            readonly fast_charger_type: {
                                                readonly type: "string";
                                            };
                                            readonly fast_charger_brand: {
                                                readonly type: "string";
                                            };
                                            readonly charge_energy_added: {
                                                readonly type: "number";
                                            };
                                            readonly charge_to_max_range: {
                                                readonly type: "boolean";
                                            };
                                            readonly ideal_battery_range: {
                                                readonly type: "integer";
                                            };
                                            readonly time_to_full_charge: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_limit_soc_max: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_limit_soc_min: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_limit_soc_std: {
                                                readonly type: "integer";
                                            };
                                            readonly fast_charger_present: {
                                                readonly type: "boolean";
                                            };
                                            readonly usable_battery_level: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_enable_request: {
                                                readonly type: "boolean";
                                            };
                                            readonly charge_port_door_open: {
                                                readonly type: "boolean";
                                            };
                                            readonly charger_pilot_current: {
                                                readonly type: "integer";
                                            };
                                            readonly preconditioning_times: {
                                                readonly type: "string";
                                            };
                                            readonly charge_current_request: {
                                                readonly type: "integer";
                                            };
                                            readonly charger_actual_current: {
                                                readonly type: "integer";
                                            };
                                            readonly minutes_to_full_charge: {
                                                readonly type: "integer";
                                            };
                                            readonly managed_charging_active: {
                                                readonly type: "boolean";
                                            };
                                            readonly off_peak_charging_times: {
                                                readonly type: "string";
                                            };
                                            readonly off_peak_hours_end_time: {
                                                readonly type: "integer";
                                            };
                                            readonly preconditioning_enabled: {
                                                readonly type: "boolean";
                                            };
                                            readonly scheduled_charging_mode: {
                                                readonly type: "string";
                                            };
                                            readonly charge_miles_added_ideal: {
                                                readonly type: "integer";
                                            };
                                            readonly charge_miles_added_rated: {
                                                readonly type: "number";
                                            };
                                            readonly max_range_charge_counter: {
                                                readonly type: "integer";
                                            };
                                            readonly not_enough_power_to_heat: {
                                                readonly type: "boolean";
                                            };
                                            readonly scheduled_departure_time: {
                                                readonly type: "integer";
                                            };
                                            readonly off_peak_charging_enabled: {
                                                readonly type: "boolean";
                                            };
                                            readonly charge_current_request_max: {
                                                readonly type: "integer";
                                            };
                                            readonly scheduled_charging_pending: {
                                                readonly type: "boolean";
                                            };
                                            readonly user_charge_enable_request: {
                                                readonly type: "string";
                                            };
                                            readonly managed_charging_start_time: {
                                                readonly type: "string";
                                            };
                                            readonly charge_port_cold_weather_mode: {
                                                readonly type: "string";
                                            };
                                            readonly scheduled_charging_start_time: {
                                                readonly type: "string";
                                            };
                                            readonly managed_charging_user_canceled: {
                                                readonly type: "boolean";
                                            };
                                            readonly scheduled_departure_time_minutes: {
                                                readonly type: "integer";
                                            };
                                            readonly scheduled_charging_start_time_app: {
                                                readonly type: "integer";
                                            };
                                            readonly supercharger_session_trip_planner: {
                                                readonly type: "boolean";
                                            };
                                            readonly pack_current: {
                                                readonly type: "number";
                                            };
                                            readonly pack_voltage: {
                                                readonly type: "number";
                                            };
                                            readonly module_temp_min: {
                                                readonly type: "number";
                                            };
                                            readonly module_temp_max: {
                                                readonly type: "integer";
                                            };
                                            readonly energy_remaining: {
                                                readonly type: "number";
                                            };
                                            readonly lifetime_energy_used: {
                                                readonly type: "number";
                                            };
                                        };
                                    };
                                    readonly display_name: {
                                        readonly type: "string";
                                    };
                                    readonly gui_settings: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly gui_24_hour_time: {
                                                readonly type: "boolean";
                                            };
                                            readonly show_range_units: {
                                                readonly type: "boolean";
                                            };
                                            readonly gui_range_display: {
                                                readonly type: "string";
                                            };
                                            readonly gui_distance_units: {
                                                readonly type: "string";
                                            };
                                            readonly gui_charge_rate_units: {
                                                readonly type: "string";
                                            };
                                            readonly gui_temperature_units: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly option_codes: {
                                        readonly type: "string";
                                    };
                                    readonly climate_state: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly fan_status: {
                                                readonly type: "integer";
                                            };
                                            readonly inside_temp: {
                                                readonly type: "number";
                                            };
                                            readonly defrost_mode: {
                                                readonly type: "integer";
                                            };
                                            readonly outside_temp: {
                                                readonly type: "number";
                                            };
                                            readonly is_climate_on: {
                                                readonly type: "boolean";
                                            };
                                            readonly battery_heater: {
                                                readonly type: "boolean";
                                            };
                                            readonly bioweapon_mode: {
                                                readonly type: "boolean";
                                            };
                                            readonly max_avail_temp: {
                                                readonly type: "integer";
                                            };
                                            readonly min_avail_temp: {
                                                readonly type: "integer";
                                            };
                                            readonly seat_heater_left: {
                                                readonly type: "integer";
                                            };
                                            readonly hvac_auto_request: {
                                                readonly type: "string";
                                            };
                                            readonly seat_heater_right: {
                                                readonly type: "integer";
                                            };
                                            readonly is_preconditioning: {
                                                readonly type: "boolean";
                                            };
                                            readonly wiper_blade_heater: {
                                                readonly type: "boolean";
                                            };
                                            readonly climate_keeper_mode: {
                                                readonly type: "string";
                                            };
                                            readonly driver_temp_setting: {
                                                readonly type: "number";
                                            };
                                            readonly left_temp_direction: {
                                                readonly type: "integer";
                                            };
                                            readonly side_mirror_heaters: {
                                                readonly type: "boolean";
                                            };
                                            readonly is_rear_defroster_on: {
                                                readonly type: "boolean";
                                            };
                                            readonly right_temp_direction: {
                                                readonly type: "integer";
                                            };
                                            readonly is_front_defroster_on: {
                                                readonly type: "boolean";
                                            };
                                            readonly seat_heater_rear_left: {
                                                readonly type: "integer";
                                            };
                                            readonly steering_wheel_heater: {
                                                readonly type: "boolean";
                                            };
                                            readonly passenger_temp_setting: {
                                                readonly type: "number";
                                            };
                                            readonly seat_heater_rear_right: {
                                                readonly type: "integer";
                                            };
                                            readonly battery_heater_no_power: {
                                                readonly type: "boolean";
                                            };
                                            readonly is_auto_conditioning_on: {
                                                readonly type: "boolean";
                                            };
                                            readonly seat_heater_rear_center: {
                                                readonly type: "integer";
                                            };
                                            readonly cabin_overheat_protection: {
                                                readonly type: "string";
                                            };
                                            readonly seat_heater_third_row_left: {
                                                readonly type: "integer";
                                            };
                                            readonly seat_heater_third_row_right: {
                                                readonly type: "integer";
                                            };
                                            readonly remote_heater_control_enabled: {
                                                readonly type: "boolean";
                                            };
                                            readonly allow_cabin_overheat_protection: {
                                                readonly type: "boolean";
                                            };
                                            readonly supports_fan_only_cabin_overheat_protection: {
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly vehicle_state: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly df: {
                                                readonly type: "integer";
                                            };
                                            readonly dr: {
                                                readonly type: "integer";
                                            };
                                            readonly ft: {
                                                readonly type: "integer";
                                            };
                                            readonly pf: {
                                                readonly type: "integer";
                                            };
                                            readonly pr: {
                                                readonly type: "integer";
                                            };
                                            readonly rt: {
                                                readonly type: "integer";
                                            };
                                            readonly locked: {
                                                readonly type: "boolean";
                                            };
                                            readonly odometer: {
                                                readonly type: "number";
                                            };
                                            readonly fd_window: {
                                                readonly type: "integer";
                                            };
                                            readonly fp_window: {
                                                readonly type: "integer";
                                            };
                                            readonly rd_window: {
                                                readonly type: "integer";
                                            };
                                            readonly rp_window: {
                                                readonly type: "integer";
                                            };
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly santa_mode: {
                                                readonly type: "integer";
                                            };
                                            readonly valet_mode: {
                                                readonly type: "boolean";
                                            };
                                            readonly api_version: {
                                                readonly type: "integer";
                                            };
                                            readonly car_version: {
                                                readonly type: "string";
                                            };
                                            readonly media_state: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly remote_control_enabled: {
                                                        readonly type: "boolean";
                                                    };
                                                };
                                            };
                                            readonly sentry_mode: {
                                                readonly type: "boolean";
                                            };
                                            readonly remote_start: {
                                                readonly type: "boolean";
                                            };
                                            readonly vehicle_name: {
                                                readonly type: "string";
                                            };
                                            readonly dashcam_state: {
                                                readonly type: "string";
                                            };
                                            readonly autopark_style: {
                                                readonly type: "string";
                                            };
                                            readonly homelink_nearby: {
                                                readonly type: "boolean";
                                            };
                                            readonly is_user_present: {
                                                readonly type: "boolean";
                                            };
                                            readonly software_update: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly status: {
                                                        readonly type: "string";
                                                    };
                                                    readonly version: {
                                                        readonly type: "string";
                                                    };
                                                    readonly install_perc: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly download_perc: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly expected_duration_sec: {
                                                        readonly type: "integer";
                                                    };
                                                };
                                            };
                                            readonly speed_limit_mode: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly active: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly pin_code_set: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly max_limit_mph: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly min_limit_mph: {
                                                        readonly type: "integer";
                                                    };
                                                    readonly current_limit_mph: {
                                                        readonly type: "integer";
                                                    };
                                                };
                                            };
                                            readonly tpms_pressure_fl: {
                                                readonly type: "string";
                                            };
                                            readonly tpms_pressure_fr: {
                                                readonly type: "string";
                                            };
                                            readonly tpms_pressure_rl: {
                                                readonly type: "string";
                                            };
                                            readonly tpms_pressure_rr: {
                                                readonly type: "string";
                                            };
                                            readonly autopark_state_v2: {
                                                readonly type: "string";
                                            };
                                            readonly calendar_supported: {
                                                readonly type: "boolean";
                                            };
                                            readonly last_autopark_error: {
                                                readonly type: "string";
                                            };
                                            readonly center_display_state: {
                                                readonly type: "integer";
                                            };
                                            readonly remote_start_enabled: {
                                                readonly type: "boolean";
                                            };
                                            readonly homelink_device_count: {
                                                readonly type: "integer";
                                            };
                                            readonly sentry_mode_available: {
                                                readonly type: "boolean";
                                            };
                                            readonly remote_start_supported: {
                                                readonly type: "boolean";
                                            };
                                            readonly smart_summon_available: {
                                                readonly type: "boolean";
                                            };
                                            readonly notifications_supported: {
                                                readonly type: "boolean";
                                            };
                                            readonly parsed_calendar_supported: {
                                                readonly type: "boolean";
                                            };
                                            readonly dashcam_clip_save_available: {
                                                readonly type: "boolean";
                                            };
                                            readonly summon_standby_mode_enabled: {
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly backseat_token: {
                                        readonly type: "string";
                                    };
                                    readonly vehicle_config: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly plg: {
                                                readonly type: "boolean";
                                            };
                                            readonly pws: {
                                                readonly type: "boolean";
                                            };
                                            readonly rhd: {
                                                readonly type: "boolean";
                                            };
                                            readonly car_type: {
                                                readonly type: "string";
                                            };
                                            readonly seat_type: {
                                                readonly type: "integer";
                                            };
                                            readonly timestamp: {
                                                readonly type: "integer";
                                            };
                                            readonly eu_vehicle: {
                                                readonly type: "boolean";
                                            };
                                            readonly roof_color: {
                                                readonly type: "string";
                                            };
                                            readonly utc_offset: {
                                                readonly type: "integer";
                                            };
                                            readonly wheel_type: {
                                                readonly type: "string";
                                            };
                                            readonly spoiler_type: {
                                                readonly type: "string";
                                            };
                                            readonly trim_badging: {
                                                readonly type: "string";
                                            };
                                            readonly driver_assist: {
                                                readonly type: "string";
                                            };
                                            readonly headlamp_type: {
                                                readonly type: "string";
                                            };
                                            readonly exterior_color: {
                                                readonly type: "string";
                                            };
                                            readonly rear_seat_type: {
                                                readonly type: "integer";
                                            };
                                            readonly rear_drive_unit: {
                                                readonly type: "string";
                                            };
                                            readonly third_row_seats: {
                                                readonly type: "string";
                                            };
                                            readonly car_special_type: {
                                                readonly type: "string";
                                            };
                                            readonly charge_port_type: {
                                                readonly type: "string";
                                            };
                                            readonly ece_restrictions: {
                                                readonly type: "boolean";
                                            };
                                            readonly front_drive_unit: {
                                                readonly type: "string";
                                            };
                                            readonly has_seat_cooling: {
                                                readonly type: "boolean";
                                            };
                                            readonly rear_seat_heaters: {
                                                readonly type: "integer";
                                            };
                                            readonly use_range_badging: {
                                                readonly type: "boolean";
                                            };
                                            readonly can_actuate_trunks: {
                                                readonly type: "boolean";
                                            };
                                            readonly efficiency_package: {
                                                readonly type: "string";
                                            };
                                            readonly has_air_suspension: {
                                                readonly type: "boolean";
                                            };
                                            readonly has_ludicrous_mode: {
                                                readonly type: "boolean";
                                            };
                                            readonly interior_trim_type: {
                                                readonly type: "string";
                                            };
                                            readonly sun_roof_installed: {
                                                readonly type: "integer";
                                            };
                                            readonly default_charge_to_max: {
                                                readonly type: "boolean";
                                            };
                                            readonly motorized_charge_port: {
                                                readonly type: "boolean";
                                            };
                                            readonly dashcam_clip_save_supported: {
                                                readonly type: "boolean";
                                            };
                                            readonly can_accept_navigation_requests: {
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly calendar_enabled: {
                                        readonly type: "boolean";
                                    };
                                    readonly backseat_token_updated_at: {
                                        readonly type: "string";
                                    };
                                };
                                readonly "x-examples": {
                                    readonly "Example 1": {
                                        readonly id: 1492931520123456;
                                        readonly vin: "5YJXCAE43LF123456";
                                        readonly id_s: "1492931520123456";
                                        readonly color: "string";
                                        readonly state: "online";
                                        readonly user_id: 1311857;
                                        readonly in_service: true;
                                        readonly vehicle_id: 1349238573;
                                        readonly access_type: "OWNER";
                                        readonly api_version: 34;
                                        readonly drive_state: {
                                            readonly power: 0;
                                            readonly speed: "string";
                                            readonly heading: 194;
                                            readonly latitude: 40.7484;
                                            readonly gps_as_of: 1643590638;
                                            readonly longitude: 73.9857;
                                            readonly timestamp: 1643590652755;
                                            readonly native_type: "wgs";
                                            readonly shift_state: "P";
                                            readonly native_latitude: 40.7484;
                                            readonly native_longitude: 73.9857;
                                            readonly native_location_supported: 1;
                                            readonly active_route_destination: "Empire State Building";
                                            readonly active_route_energy_at_arrival: 81;
                                            readonly active_route_latitude: -1.123456;
                                            readonly active_route_longitude: 1.123456;
                                            readonly active_route_miles_to_arrival: 4.12;
                                            readonly active_route_minutes_to_arrival: 5.43;
                                            readonly active_route_traffic_minutes_delay: 0;
                                        };
                                        readonly charge_state: {
                                            readonly timestamp: 1643590652755;
                                            readonly charge_amps: 12;
                                            readonly charge_rate: 0;
                                            readonly battery_level: 89;
                                            readonly battery_range: 269.01;
                                            readonly charger_power: 0;
                                            readonly trip_charging: true;
                                            readonly charger_phases: "string";
                                            readonly charging_state: "Complete";
                                            readonly charger_voltage: 0;
                                            readonly charge_limit_soc: 90;
                                            readonly battery_heater_on: true;
                                            readonly charge_port_color: "Off";
                                            readonly charge_port_latch: "Engaged";
                                            readonly conn_charge_cable: "SAE";
                                            readonly est_battery_range: 223.25;
                                            readonly fast_charger_type: "MCSingleWireCAN";
                                            readonly fast_charger_brand: "<invalid>";
                                            readonly charge_energy_added: 4.64;
                                            readonly charge_to_max_range: true;
                                            readonly ideal_battery_range: 999;
                                            readonly time_to_full_charge: 0;
                                            readonly charge_limit_soc_max: 100;
                                            readonly charge_limit_soc_min: 50;
                                            readonly charge_limit_soc_std: 90;
                                            readonly fast_charger_present: true;
                                            readonly usable_battery_level: 89;
                                            readonly charge_enable_request: true;
                                            readonly charge_port_door_open: true;
                                            readonly charger_pilot_current: 12;
                                            readonly preconditioning_times: "weekdays";
                                            readonly charge_current_request: 12;
                                            readonly charger_actual_current: 0;
                                            readonly minutes_to_full_charge: 0;
                                            readonly managed_charging_active: true;
                                            readonly off_peak_charging_times: "all_week";
                                            readonly off_peak_hours_end_time: 375;
                                            readonly preconditioning_enabled: true;
                                            readonly scheduled_charging_mode: "Off";
                                            readonly charge_miles_added_ideal: 4641;
                                            readonly charge_miles_added_rated: 14.5;
                                            readonly max_range_charge_counter: 0;
                                            readonly not_enough_power_to_heat: true;
                                            readonly scheduled_departure_time: 1643578200;
                                            readonly off_peak_charging_enabled: true;
                                            readonly charge_current_request_max: 12;
                                            readonly scheduled_charging_pending: true;
                                            readonly user_charge_enable_request: "string";
                                            readonly managed_charging_start_time: "string";
                                            readonly charge_port_cold_weather_mode: "string";
                                            readonly scheduled_charging_start_time: "string";
                                            readonly managed_charging_user_canceled: true;
                                            readonly scheduled_departure_time_minutes: 810;
                                            readonly scheduled_charging_start_time_app: 817;
                                            readonly supercharger_session_trip_planner: true;
                                            readonly pack_current: -0.7;
                                            readonly pack_voltage: 419.79;
                                            readonly module_temp_min: 25.5;
                                            readonly module_temp_max: 26;
                                            readonly energy_remaining: 51.26;
                                            readonly lifetime_energy_used: 5224.713;
                                        };
                                        readonly display_name: "Seneca";
                                        readonly gui_settings: {
                                            readonly timestamp: 1643590652755;
                                            readonly gui_24_hour_time: true;
                                            readonly show_range_units: true;
                                            readonly gui_range_display: "Rated";
                                            readonly gui_distance_units: "mi/hr";
                                            readonly gui_charge_rate_units: "kW";
                                            readonly gui_temperature_units: "F";
                                        };
                                        readonly option_codes: "AD15MDL3PBSBRENABT37ID3WRF3GS3PBDRLHDV2WW39BAPF0COUSBC3BCH07PC30FC3PFG31GLFRHL31HM31IL31LTPBMR31FM3BRS3HSA3PSTCPSC04SU3CT3CATW00TM00UT3PWR00AU3PAPH3AF00ZCSTMI00CDM0";
                                        readonly climate_state: {
                                            readonly timestamp: 1643590652755;
                                            readonly fan_status: 0;
                                            readonly inside_temp: 24.3;
                                            readonly defrost_mode: 0;
                                            readonly outside_temp: 17.5;
                                            readonly is_climate_on: true;
                                            readonly battery_heater: true;
                                            readonly bioweapon_mode: true;
                                            readonly max_avail_temp: 28;
                                            readonly min_avail_temp: 15;
                                            readonly seat_heater_left: 0;
                                            readonly hvac_auto_request: "On";
                                            readonly seat_heater_right: 0;
                                            readonly is_preconditioning: true;
                                            readonly wiper_blade_heater: true;
                                            readonly climate_keeper_mode: "off";
                                            readonly driver_temp_setting: 22.8;
                                            readonly left_temp_direction: 0;
                                            readonly side_mirror_heaters: true;
                                            readonly is_rear_defroster_on: true;
                                            readonly right_temp_direction: 0;
                                            readonly is_front_defroster_on: true;
                                            readonly seat_heater_rear_left: 0;
                                            readonly steering_wheel_heater: true;
                                            readonly passenger_temp_setting: 22.8;
                                            readonly seat_heater_rear_right: 0;
                                            readonly battery_heater_no_power: true;
                                            readonly is_auto_conditioning_on: true;
                                            readonly seat_heater_rear_center: 0;
                                            readonly cabin_overheat_protection: "On";
                                            readonly seat_heater_third_row_left: 0;
                                            readonly seat_heater_third_row_right: 0;
                                            readonly remote_heater_control_enabled: true;
                                            readonly allow_cabin_overheat_protection: true;
                                            readonly supports_fan_only_cabin_overheat_protection: true;
                                        };
                                        readonly vehicle_state: {
                                            readonly df: 0;
                                            readonly dr: 0;
                                            readonly ft: 0;
                                            readonly pf: 0;
                                            readonly pr: 0;
                                            readonly rt: 0;
                                            readonly locked: true;
                                            readonly odometer: 14096.485641;
                                            readonly fd_window: 0;
                                            readonly fp_window: 0;
                                            readonly rd_window: 0;
                                            readonly rp_window: 0;
                                            readonly timestamp: 1643590652755;
                                            readonly santa_mode: 0;
                                            readonly valet_mode: true;
                                            readonly api_version: 34;
                                            readonly car_version: "2022.4 fae2af490933";
                                            readonly media_state: {
                                                readonly remote_control_enabled: true;
                                            };
                                            readonly sentry_mode: true;
                                            readonly remote_start: true;
                                            readonly vehicle_name: "Seneca";
                                            readonly dashcam_state: "Unavailable";
                                            readonly autopark_style: "standard";
                                            readonly homelink_nearby: true;
                                            readonly is_user_present: true;
                                            readonly software_update: {
                                                readonly status: "available";
                                                readonly version: "2022.4";
                                                readonly install_perc: 1;
                                                readonly download_perc: 0;
                                                readonly expected_duration_sec: 2700;
                                            };
                                            readonly speed_limit_mode: {
                                                readonly active: true;
                                                readonly pin_code_set: true;
                                                readonly max_limit_mph: 90;
                                                readonly min_limit_mph: 50;
                                                readonly current_limit_mph: 84;
                                            };
                                            readonly tpms_pressure_fl: "string";
                                            readonly tpms_pressure_fr: "string";
                                            readonly tpms_pressure_rl: "string";
                                            readonly tpms_pressure_rr: "string";
                                            readonly autopark_state_v2: "standby";
                                            readonly calendar_supported: true;
                                            readonly last_autopark_error: "no_error";
                                            readonly center_display_state: 0;
                                            readonly remote_start_enabled: true;
                                            readonly homelink_device_count: 0;
                                            readonly sentry_mode_available: true;
                                            readonly remote_start_supported: true;
                                            readonly smart_summon_available: true;
                                            readonly notifications_supported: true;
                                            readonly parsed_calendar_supported: true;
                                            readonly dashcam_clip_save_available: true;
                                            readonly summon_standby_mode_enabled: true;
                                        };
                                        readonly backseat_token: "string";
                                        readonly vehicle_config: {
                                            readonly plg: true;
                                            readonly pws: true;
                                            readonly rhd: true;
                                            readonly car_type: "modelx";
                                            readonly seat_type: 0;
                                            readonly timestamp: 1643590652755;
                                            readonly eu_vehicle: true;
                                            readonly roof_color: "None";
                                            readonly utc_offset: -28800;
                                            readonly wheel_type: "Turbine22Dark";
                                            readonly spoiler_type: "Passive";
                                            readonly trim_badging: "p100d";
                                            readonly driver_assist: "TeslaAP3";
                                            readonly headlamp_type: "Led";
                                            readonly exterior_color: "Pearl";
                                            readonly rear_seat_type: 7;
                                            readonly rear_drive_unit: "Large";
                                            readonly third_row_seats: "FuturisFoldFlat";
                                            readonly car_special_type: "base";
                                            readonly charge_port_type: "US";
                                            readonly ece_restrictions: true;
                                            readonly front_drive_unit: "PermanentMagnet";
                                            readonly has_seat_cooling: true;
                                            readonly rear_seat_heaters: 3;
                                            readonly use_range_badging: true;
                                            readonly can_actuate_trunks: true;
                                            readonly efficiency_package: "Default";
                                            readonly has_air_suspension: true;
                                            readonly has_ludicrous_mode: true;
                                            readonly interior_trim_type: "AllBlack";
                                            readonly sun_roof_installed: 0;
                                            readonly default_charge_to_max: true;
                                            readonly motorized_charge_port: true;
                                            readonly dashcam_clip_save_supported: true;
                                            readonly can_accept_navigation_requests: true;
                                        };
                                        readonly calendar_enabled: true;
                                        readonly backseat_token_updated_at: "string";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWeather: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly location: {
                    readonly type: "string";
                };
                readonly condition: {
                    readonly type: "string";
                };
                readonly temperature: {
                    readonly type: "number";
                };
                readonly feels_like: {
                    readonly type: "number";
                };
                readonly humidity: {
                    readonly type: "integer";
                };
                readonly visibility: {
                    readonly type: "integer";
                };
                readonly pressure: {
                    readonly type: "integer";
                };
                readonly sunrise: {
                    readonly type: "integer";
                };
                readonly sunset: {
                    readonly type: "integer";
                };
                readonly cloudiness: {
                    readonly type: "integer";
                };
                readonly wind_speed: {
                    readonly type: "number";
                };
                readonly wind_direction: {
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Honk: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Lock: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const OpenChargePort: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const OpenTonneau: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RemoteStart: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RemoveChargeSchedule: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the schedule to delete.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RemovePreconditionSchedule: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly id: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the schedule to delete.";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RevokeInvitation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Invitation ID.";
                };
            };
            readonly required: readonly ["vin", "id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly result: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ScheduleSoftwareUpdate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly in_seconds: {
                    readonly type: "number";
                    readonly examples: readonly [0];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds in the future to schedule the update for. Set to 0 to schedule the update immediately.";
                };
            };
            readonly required: readonly ["in_seconds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetBioweaponMode: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly on: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to enable Bioweapon Defense Mode.";
                };
            };
            readonly required: readonly ["on"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetChargeCost: {
    readonly body: {
        readonly type: "object";
        readonly "x-examples": {
            readonly "Example 1": {
                readonly cost: 0.67;
            };
        };
        readonly properties: {
            readonly cost: {
                readonly type: readonly ["number", "null"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the charge.";
                };
            };
            readonly required: readonly ["vin", "id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cost: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The cost of the charge. Leave empty to remove the cost.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetChargeLimit: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly percent: {
                    readonly type: "number";
                    readonly examples: readonly [100];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The battery percentage to charge to.";
                };
            };
            readonly required: readonly ["percent"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetChargingAmps: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly amps: {
                    readonly type: "number";
                    readonly examples: readonly [8];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of amps.";
                };
            };
            readonly required: readonly ["amps"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetClimateKeeperMode: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly mode: {
                    readonly type: "integer";
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The Climate Keeper mode. Use 1 for Keep Mode, 2 for Dog Mode, 3 for Camp Mode, 0 to disable.";
                };
            };
            readonly required: readonly ["mode"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetDriveTag: {
    readonly body: {
        readonly description: "";
        readonly type: "object";
        readonly properties: {
            readonly drives: {
                readonly type: "string";
                readonly description: "A list of drive IDs.";
                readonly examples: readonly ["10000,10001,10002"];
            };
            readonly tag: {
                readonly type: "string";
                readonly description: "The tag to apply to the drives.";
                readonly examples: readonly ["Business"];
            };
        };
        readonly required: readonly ["drives"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "";
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly required: readonly ["result"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetFleetTelemetryConfig: {
    readonly body: {
        readonly type: "object";
        readonly "x-examples": {
            readonly "Example 1": {
                readonly fields: {
                    readonly ACChargingPower: {
                        readonly interval_seconds: 60;
                    };
                    readonly BatteryLevel: {
                        readonly interval_seconds: 60;
                    };
                    readonly ChargeState: {
                        readonly interval_seconds: 60;
                    };
                    readonly DCChargingPower: {
                        readonly interval_seconds: 60;
                    };
                    readonly EnergyRemaining: {
                        readonly interval_seconds: 60;
                    };
                    readonly Gear: {
                        readonly interval_seconds: 60;
                    };
                    readonly IdealBatteryRange: {
                        readonly interval_seconds: 60;
                    };
                    readonly Location: {
                        readonly interval_seconds: 60;
                    };
                    readonly Odometer: {
                        readonly interval_seconds: 60;
                    };
                    readonly RatedRange: {
                        readonly interval_seconds: 60;
                    };
                };
            };
        };
        readonly properties: {
            readonly fields: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly updated_vehicles: {
                    readonly type: "integer";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly updated_vehicles: 1;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetPlate: {
    readonly body: {
        readonly type: "object";
        readonly "x-examples": {
            readonly "Example 1": {
                readonly plate: "T12345";
            };
        };
        readonly properties: {
            readonly plate: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly "x-examples": {
                readonly Example: {
                    readonly result: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetScheduledCharging: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly enable: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to enable scheduled charging.";
                };
                readonly time: {
                    readonly type: "number";
                    readonly examples: readonly [30];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minutes past midnight local time to start charging.";
                };
            };
            readonly required: readonly ["enable", "time"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetScheduledDeparture: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly enable: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to enable scheduled departure.";
                };
                readonly departure_time: {
                    readonly type: "number";
                    readonly examples: readonly [480];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The departure time in minutes past midnight local time.";
                };
                readonly preconditioning_enabled: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to precondition the cabin.";
                };
                readonly preconditioning_weekdays_only: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to precondition the cabin on weekdays only.";
                };
                readonly off_peak_charging_enabled: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to perform off-peak charging.";
                };
                readonly off_peak_charging_weekdays_only: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to perform off-peak charging on weekdays only.";
                };
                readonly end_off_peak_time: {
                    readonly type: "number";
                    readonly examples: readonly [360];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The end of the off-peak charging time in minutes past midnight local time.";
                };
            };
            readonly required: readonly ["enable", "departure_time"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetSeatCooling: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly seat: {
                    readonly type: "string";
                    readonly enum: readonly ["front_left", "front_right", "rear_lefta", "rear_center", "rear_right", "third_row_left", "third_row_right"];
                    readonly examples: readonly ["front_left"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The name of the seat, or \"all\".";
                };
                readonly level: {
                    readonly default: 3;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The cooling level. Set to 0 to turn off.";
                };
            };
            readonly required: readonly ["seat"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetSeatHeating: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly seat: {
                    readonly type: "string";
                    readonly enum: readonly ["front_left", "front_right", "rear_lefta", "rear_center", "rear_right", "third_row_left", "third_row_right"];
                    readonly examples: readonly ["front_left"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The name of the seat, or \"all\".";
                };
                readonly level: {
                    readonly default: 3;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The heating level. Set to 0 to turn off.";
                };
            };
            readonly required: readonly ["seat"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetSpeedLimit: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly mph: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The speed limit.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SetTemperatures: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly temperature: {
                    readonly maximum: 28;
                    readonly minimum: 15;
                    readonly type: "number";
                    readonly examples: readonly [23];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The temperature in Celsius.";
                };
            };
            readonly required: readonly ["temperature"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Share: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
                readonly value: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A street address, latitude/longitude coordinates or a video URL.";
                };
                readonly locale: {
                    readonly type: "string";
                    readonly default: "en-US";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The language and country code locale of the address. Useful for helping addresses translate to the navigation system accurately.";
                };
            };
            readonly required: readonly ["value"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StartCharging: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StartClimate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StartMaxDefrost: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StartSteeringWheelHeater: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StopCharging: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StopClimate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StopMaxDefrost: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StopSteeringWheelHeater: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TriggerHomelink: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Unlock: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const VentSunroof: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const VentWindows: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly retry_duration: {
                    readonly default: 40;
                    readonly maximum: 90;
                    readonly minimum: 0;
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of seconds that the command is attempted for.";
                };
                readonly wait_for_completion: {
                    readonly default: true;
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Whether to wait for the command to complete before returning a response.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly description: "Whether the command was successful.";
                    readonly type: "boolean";
                };
                readonly woke: {
                    readonly description: "Whether the vehicle was asleep.";
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Wake: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly vin: {
                    readonly type: "string";
                    readonly examples: readonly ["5YJXCAE43LF123456"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The associated VIN.";
                };
            };
            readonly required: readonly ["vin"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly result: {
                    readonly type: "boolean";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { ActivateFrontTrunk, ActivateRearTrunk, AddChargeSchedule, AddPreconditionSchedule, Boombox, CancelSoftwareUpdate, ClearSpeedLimitPin, CloseChargePort, CloseSunroof, CloseTonneau, CloseWindows, CreateInvitation, DeleteDriver, DeleteFleetTelemetryConfig, DisableGuest, DisableSentry, DisableSpeedLimit, DisableValet, EnableGuest, EnableSentry, EnableSpeedLimit, EnableValet, Flash, GetBattery, GetBatteryHealth, GetBatteryHealthMeasurements, GetCharges, GetConsumption, GetDrivers, GetDrives, GetDrivingPath, GetFirmwareAlerts, GetFleetChargingInvoices, GetFleetTelemetryConfig, GetHistoricalStates, GetIdles, GetInvitations, GetLastIdleState, GetLocation, GetMap, GetPlate, GetState, GetStatus, GetTirePressure, GetVehicles, GetWeather, Honk, Lock, OpenChargePort, OpenTonneau, RemoteStart, RemoveChargeSchedule, RemovePreconditionSchedule, RevokeInvitation, ScheduleSoftwareUpdate, SetBioweaponMode, SetChargeCost, SetChargeLimit, SetChargingAmps, SetClimateKeeperMode, SetDriveTag, SetFleetTelemetryConfig, SetPlate, SetScheduledCharging, SetScheduledDeparture, SetSeatCooling, SetSeatHeating, SetSpeedLimit, SetTemperatures, Share, StartCharging, StartClimate, StartMaxDefrost, StartSteeringWheelHeater, StopCharging, StopClimate, StopMaxDefrost, StopSteeringWheelHeater, TriggerHomelink, Unlock, VentSunroof, VentWindows, Wake };
