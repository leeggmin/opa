package deploy

import rego.v1

default allow := false

allow if {
    valid_input
    count(deny) == 0
}

valid_input if {
    is_object(input)
    is_string(input.service)
    is_string(input.image)
    is_string(input.environment)
    is_number(input.replicas)
    is_number(input.host_port)
    is_number(input.container_port)
    is_number(input.run_as_user)
    is_boolean(input.privileged)
    is_boolean(input.read_only)
    is_boolean(input.no_new_privileges)
    is_array(input.cap_drop)
}

deny contains "Deployment input is missing required fields or has invalid types." if {
    not valid_input
}

deny contains "Only the opa-lab service can be deployed by this lab." if {
    input.service != "opa-lab"
}

deny contains "Only development and staging deployments are allowed locally." if {
    not input.environment in {"development", "staging"}
}

deny contains "Use an explicit version of the opa-cicd-demo image." if {
    not regex.match(`^opa-cicd-demo:[A-Za-z0-9_][A-Za-z0-9_.-]*$`, input.image)
}

deny contains "The latest image tag is forbidden." if {
    endswith(input.image, ":latest")
}

deny contains "This single-container lab requires exactly one replica." if {
    input.replicas != 1
}

deny contains "Host port must be an integer between 1024 and 65535." if {
    not valid_host_port
}

valid_host_port if {
    input.host_port >= 1024
    input.host_port <= 65535
    input.host_port == floor(input.host_port)
}

deny contains "The demo application listens on container port 8080." if {
    input.container_port != 8080
}

deny contains "Privileged containers are forbidden." if {
    input.privileged != false
}

deny contains "The container must run as the unprivileged application user 1000." if {
    input.run_as_user != 1000
}

deny contains "The container filesystem must be read-only." if {
    input.read_only != true
}

deny contains "All Linux capabilities must be dropped." if {
    input.cap_drop != ["ALL"]
}

deny contains "Privilege escalation must be disabled." if {
    input.no_new_privileges != true
}