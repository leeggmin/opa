package deploy_test

import rego.v1
import data.deploy

valid_deployment := {
    "service": "opa-lab",
    "image": "opa-cicd-demo:1.0.0",
    "environment": "development",
    "replicas": 1,
    "host_port": 18080,
    "container_port": 8080,
    "privileged": false,
    "run_as_user": 1000,
    "read_only": true,
    "cap_drop": ["ALL"],
    "no_new_privileges": true,
}

test_allows_safe_development if {
    deploy.allow with input as valid_deployment
}

test_allows_safe_staging if {
    candidate := object.union(valid_deployment, {"environment": "staging"})
    deploy.allow with input as candidate
}

test_rejects_each_unsafe_setting if {
    every change in [
        {"service": "other-service"},
        {"image": "opa-cicd-demo:latest"},
        {"image": "opa-cicd-demo"},
        {"image": "other-image:1.0.0"},
        {"environment": "production"},
        {"environment": "unknown"},
        {"replicas": 2},
        {"host_port": 80},
        {"host_port": 65536},
        {"host_port": 18080.5},
        {"container_port": 80},
        {"privileged": true},
        {"run_as_user": 0},
        {"read_only": false},
        {"cap_drop": []},
        {"cap_drop": ["ALL", "NET_ADMIN"]},
        {"no_new_privileges": false},
    ] {
        candidate := object.union(valid_deployment, change)
        not deploy.allow with input as candidate
        count(deploy.deny) > 0 with input as candidate
    }
}

test_fails_closed_for_malformed_input if {
    every invalid in [null, [], {}, "invalid"] {
        not deploy.allow with input as invalid
        count(deploy.deny) > 0 with input as invalid
    }
}

test_fails_closed_for_each_missing_field if {
    every field in object.keys(valid_deployment) {
        candidate := object.remove(valid_deployment, [field])
        not deploy.allow with input as candidate
    }
}

test_rejects_string_instead_of_boolean if {
    candidate := object.union(valid_deployment, {"privileged": "false"})
    not deploy.allow with input as candidate
}