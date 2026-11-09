package access

import rego.v1

default allow := false

# PR checks and the pre-deployment gate intentionally use the same permission rule.
allow if {
    valid_input
    count(deny) == 0
}

valid_input if {
    is_object(input)
    is_string(input.actor)
    input.actor != ""
    input.stage in {"pr", "deploy"}
    is_array(input.changes)
    count(input.changes) > 0
    every change in input.changes {
        is_object(change)
        valid_path(change.filename)
        valid_path(object.get(change, "previous_filename", change.filename))
    }
    is_array(data.authorization.members)
    count(data.authorization.members) > 0
    every member in data.authorization.members {
        is_string(member)
        member != ""
    }
}

valid_path(path) if {
    is_string(path)
    path != ""
    not startswith(path, "/")
    not contains(path, "\\")
    every part in split(path, "/") {
        part != ""
        part != "."
        part != ".."
    }
}

is_member if {
    some member in data.authorization.members
    lower(member) == lower(input.actor)
}

protected_path(path) if {
    path == "frontend/src/shared"
}

protected_path(path) if {
    startswith(path, "frontend/src/shared/")
}

# Prevent non-members from changing the controls that enforce their permissions.
protected_path(path) if {
    some prefix in {"policy/", "scripts/", "deploy/", ".github/"}
    startswith(path, prefix)
}

protected_path(path) if {
    path in {"Dockerfile", "package.json", ".dockerignore", ".gitignore", ".gitattributes"}
}

changed_paths contains path if {
    some change in input.changes
    path := change.filename
}

changed_paths contains path if {
    some change in input.changes
    path := change.previous_filename
}

deny contains "Missing or invalid actor, stage, changed files, or trusted member list." if {
    not valid_input
}

deny contains sprintf("Only members may change %s (author: %s).", [path, input.actor]) if {
    valid_input
    not is_member
    some path in changed_paths
    protected_path(path)
}