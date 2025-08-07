<link rel="stylesheet" type="text/css" href="../styles.css">

# Environment Variables
``` Shell
# Numer of processes
$(nproc)
```

# Syslog
Syslog defines eight standard severity levels, each represented by a numeric value and a corresponding label.
Syslog Severity Levels are, in order of increasing severity:
- Emergency (0):  
    Description: The highest level of severity. This indicates a system is unusable.
    Example: A complete system failure or a critical hardware malfunction.
- Alert (1):  
    Description: Immediate action is required. This level indicates a serious condition that needs urgent attention.
    Example: A critical service is down, and immediate intervention is necessary.
- Critical (2):  
    Description: Indicates a critical condition that may lead to a failure or significant disruption.
    Example: A major application failure or a significant hardware issue.
- Error (3):  
    Description: An error has occurred, but it does not require immediate action. It indicates a problem that needs to be addressed.
    Example: A failed login attempt or a failed backup process.
- Warning (4):  
    Description: A warning indicates a potential problem that could lead to an error if not addressed.
    Example: Disk space running low or a deprecated feature being used.
- Notice (5):  
    Description: A normal but significant condition that is noteworthy.
    Example: A configuration change that has been applied successfully.
- Informational (6):  
    Description: General information messages that provide insights into the system's operation.
    Example: A user successfully logged in or a service started.
- Debug (7):  
    Description: Detailed information used for debugging purposes. This level is typically used by developers or system administrators.
    Example: Detailed logs of a process execution or variable values during execution.

 
# Signals
| Signal   | Code    | Feature | Description |  
| :---     | :---:   | :--- | :--- |  
| SIGHUP   | 1       | 終止進程 | 終止進程 |
| SIGINT   | 2       | 終止進程 | 終止進程 |
| SIGQUIT  | 3       | 終止CORE檔案 | 終止CORE檔案，並且生成core檔案 |
| SIGILL   | 4       | 建立CORE檔案 | 建立CORE檔案 |
| SIGTRAP  | 5       | 非法指令 | 非法指令 |
| SIGABRT  | 6       | 建立CORE檔案 | 建立CORE檔案  |
| SIGBUS   | 7       | 產生總線錯誤 | 產生總線錯誤 |
| SIGSEGV  | 11      | 產生段錯誤 | 產生段錯誤|
| SIGPIPE  | 13      | 管道破裂 | 管道破裂 |
| SIGALRM  | 14      | 定時器到期 | 定時器到期 |
| SIGTERM  | 15      | 終止進程 | 終止進程 |
| SIGUSR1  | 10      | 使用者定義信號1 | 使用者定義信號1 |
| SIGUSR2  | 12      | 使用者定義信號2 | 使用者定義信號2 |
| SIGCHLD  | 17      | 子進程結束 | 子進程結束 |
| SIGCONT  | 18      | 繼續執行 | 繼續執行 |
| SIGSTOP  | 19      | 停止進程 | 停止進程 |
| SIGTSTP  | 20      | 停止進程 | 停止進程 |
| SIGTTIN  | 21      | 後台進程請求輸入 | 後台進程請求輸入 |
| SIGTTOU  | 22      | 後台進程請求輸出 | 後台進程請求輸出 |

 
# Special Files & Folders
## /etc/rc.local
It is used to run commands or start services that should be initiated after all other system services have been started.

## /etc/diag.sh
It may contain commands and checks to help troubleshoot system issues or gather information about the system's status.

## qsdk/feeds/package
Contains additional software packages for inclusion in the QSDK build, allowing for customization and integration of various components.

## qsdk/package
Contains core packages essential for the QSDK, including base system components and configuration files.

## qsdk/qca/feeds/package
Contains QCA-specific packages tailored for Qualcomm Atheros hardware, including drivers and utilities optimized for QCA chipsets.
