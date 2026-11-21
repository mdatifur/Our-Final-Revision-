# Team Workflow - Evercare Medical Center

Four members, one repository, **no conflicts** if everybody follows these rules.

## Who owns what

| Member | Module | Files (only this person edits them) | Branch |
|---|---|---|---|
| **Shohan** (Team Leader) | Admin + Home | `admin.html`, `js/admin.js`, `index.html`, `js/home.js` | `feature/shohan-admin-home` |
| **Alif** | Doctor + Login | `doctor.html`, `js/doctor.js`, `login.html`, `js/login.js` | `feature/alif-doctor-login` |
| **Saad** | Patient + Registration | `patient.html`, `js/patient.js`, `register.html`, `js/register.js` | `feature/saad-patient-register` |
| **Najir** | Receptionist | `receptionist.html`, `js/receptionist.js` | `feature/najir-receptionist` |

## Shared files (css/style.css, js/data.js, js/common.js)

* Every block / section has an `[OWNER: Name]` tag. **Only that person edits it.**
* To add something new, write it **only inside your own zone** at the end of the file:
  `>>> YOURNAME ZONE START` ... `<<< YOURNAME ZONE END`.
* Need a change in someone else's block? Ask the owner or open an Issue. Do not edit it yourself.

## Everyday steps

```bash
git switch main && git pull origin main          # 1. get the latest code
git switch feature/<your-branch>                  # 2. go to your own branch
git merge main                                    # 3. bring main's updates into your branch
# ... work only on your files / your zone ...
git add <your files>                              # 4. never use "git add ." without git status
git commit -m "feat(doctor): add next-patient queue button"
git push -u origin feature/<your-branch>          # 5. push your branch
# 6. open a Pull Request on GitHub:  your branch  ->  main
```

Commit message format: `type(scope): short description`, e.g. `feat(patient): add queue tracker`, `fix(login): show pending message`.

## Merge order (team leader)

1. Shohan's PR  2. Alif's PR  3. Saad's PR  4. Najir's PR.
After each merge, the next person runs `git merge main` on their branch before the PR is merged.
Never use `git push --force`. Never push straight to `main`.
