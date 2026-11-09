package access_test

import rego.v1
import data.access

request(actor, stage, changes) := {"actor": actor, "stage": stage, "changes": changes}

test_member_can_change_shared_in_both_stages if {
    every stage in ["pr", "deploy"] {
        access.allow with input as request("Member", stage, [{"filename": "frontend/src/shared/ui/Button.jsx"}])
            with data.authorization.members as ["member"]
    }
}

test_nonmember_can_change_other_layers if {
    every stage in ["pr", "deploy"] {
        access.allow with input as request("guest", stage, [
            {"filename": "frontend/src/features/users/index.js"},
            {"filename": "frontend/src/pages/Home.jsx"},
            {"filename": "frontend/src/entities/user/index.js"},
        ]) with data.authorization.members as ["member"]
    }
}

test_nonmember_cannot_change_shared_in_either_stage if {
    every stage in ["pr", "deploy"] {
        not access.allow with input as request("guest", stage, [{"filename": "frontend/src/shared/lib/index.js"}])
            with data.authorization.members as ["member"]
    }
}

test_rename_out_of_shared_is_still_denied if {
    not access.allow with input as request("guest", "pr", [{
        "filename": "frontend/src/features/copied.js",
        "previous_filename": "frontend/src/shared/lib/original.js",
    }]) with data.authorization.members as ["member"]
}

test_nonmember_cannot_modify_enforcement if {
    every path in ["policy/members.json", "policy/access.rego", "scripts/access.mjs", ".github/workflows/ci.yml", "Dockerfile"] {
        not access.allow with input as request("guest", "pr", [{"filename": path}])
            with data.authorization.members as ["member"]
    }
}

test_similar_shared_name_is_not_protected if {
    access.allow with input as request("guest", "pr", [{"filename": "frontend/src/shared-other/index.js"}])
        with data.authorization.members as ["member"]
}

test_empty_or_untrusted_input_is_denied if {
    every invalid in [null, {}, request("", "pr", [{"filename": "README.md"}]), request("guest", "pr", []),
        request("guest", "unknown", [{"filename": "README.md"}]),
        request("guest", "pr", [{"filename": "frontend/src/shared/../features/index.js"}])] {
        not access.allow with input as invalid with data.authorization.members as ["member"]
    }
}

test_missing_member_data_is_denied if {
    not access.allow with input as request("guest", "pr", [{"filename": "README.md"}])
        with data.authorization.members as []
}